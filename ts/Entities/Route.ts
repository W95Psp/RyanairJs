import {ryanairApiUrl, apiCall} from '../apiCall';
import {RyanairGeoPlace} from './RyanairGeoPlace';
import {RyanairContext} from './RyanairContext';

import {Country} from './Country';
import {Region} from './Region';
import {Flight} from './Flight';
import {Airport} from './Airport';

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export class Route {
	ref: RyanairContext;
	airportFrom: Airport;
	airportTo: Airport;
	constructor(ref: RyanairContext, airportFrom: Airport, airportTo: Airport){
		this.ref = ref;
		this.airportTo = airportTo;
		this.airportFrom = airportFrom;
	}
	async findTo(date: Date, flex = 0): Promise<Flight[]>{
		let results = <Flight[]>[];
		for(let cflex=0; cflex <= flex; cflex += 6)
			(await this._findTo(addDays(date, cflex), Math.min(6, flex-cflex))).forEach(r => results.push(r));
		return results;
	}
	private async _findTo(date: Date, flex = 0): Promise<Flight[]>{
		let [from, to] = [this.airportFrom.iataCode, this.airportTo.iataCode];
		let data:any = await apiCall(ryanairApiUrl.getFaresForDay(date, from, to, flex));
		let list = data.trips.reduce((p, c) => p.concat(
				c.dates.reduce((p, c) => p.concat(c.flights), [])
			), []);
		return list.filter(d => d.regularFare).map(desc => new Flight(this.ref, this, data.currency, desc));
	}
}