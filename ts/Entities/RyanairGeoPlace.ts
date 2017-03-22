import {RyanairContext} from './RyanairContext';
import {Country} from './Country';
import {Airport} from './Airport';
import {Region} from './Region';
import {Flight} from './Flight';
import {City} from './City';
import {Route} from './Route';
import {GPSPoint} from './GPSPoint';

let extractAirports = (o:any):Airport[] => o.constructor.name=='Airport' ? [o] : [...(<any>o).airports];

export class RyanairGeoPlace {
	ref: RyanairContext;
	constructor(ref: RyanairContext){
		this.ref = ref;
	}

	async findTo(dest: RyanairGeoPlace, date: Date, searchWithInNDays = 0): Promise<Flight[]>{
		let destinations:any = extractAirports(dest);

		let routesNotFlat = extractAirports(this).map(src => 
			destinations
				.filter(dest => src.routes.find(r => r.airportTo==dest))
				.map(dest => new Route(this.ref, src, dest))
		);
		let routes = routesNotFlat.reduce((p, c) => p.concat(c), []);
		let results = [];
		for(let route of routes)
			results.push(await route.findTo(date, searchWithInNDays));
		results.reduce((p, c) => p.concat(c), []);
		return results.reduce((p, c) => p.concat(c), []);
	}

	async findAll(date: Date, searchWithInNDays = 0){
		let results = <Flight[]>[];
		let sources:any = extractAirports(this);
		let routes = sources.reduce((p, c) => p.concat(c.routes), []);
		for(let route of routes)
			(await route.findTo(date, searchWithInNDays)).forEach(r => results.push(r));
		return results;
	}

	getGeoContainer(): RyanairGeoPlaceContainer{
		return new RyanairGeoPlaceContainer(this.ref, ...extractAirports(this));
	}

	union(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer{
		return this.getGeoContainer()._union(...list.map(o => o.getGeoContainer()));
	}

	intersect(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer{
		return this.getGeoContainer()._intersect(...list.map(o => o.getGeoContainer()));
	}
	getNearbyAirports(howFarKm: number) : RyanairGeoPlaceContainer{
		return RyanairGeoPlaceContainer._getNearbyAirports(this.ref, this, howFarKm);
	}
}

let extractAirportsFromList = (list: RyanairGeoPlace[]): Airport[] => {
	return list.reduce((p, c) => p.concat(extractAirports(c)), []);
}

export class RyanairGeoPlaceContainer extends RyanairGeoPlace {
	airports: Set<Airport> = new Set();
	_union(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer{
		let airports = extractAirportsFromList(list);
		return new RyanairGeoPlaceContainer(this.ref, ...[...this.airports, ...airports]);
	}
	_intersect(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer{
		let airports = extractAirportsFromList(list).filter(a => this.airports.has(a));
		return new RyanairGeoPlaceContainer(this.ref, ...[...this.airports, ...airports]);
	}
	constructor(ref: RyanairContext, ...list: RyanairGeoPlace[]) {
		super(ref);
		this.airports = new Set(extractAirportsFromList(list));
	}
	static _getNearbyAirports(ref: RyanairContext, sources: GPSPoint | RyanairGeoPlace, howFarKm: number){
		let point;
		if(sources.constructor.name == 'GPSPoint')
			point = sources;
		else
			point = GPSPoint.mean(...extractAirports(sources).map(a => a.coordinates));
		let airports = [...ref.airports.values()].filter(a => a.coordinates.distanceTo(point) <= howFarKm);
		return new RyanairGeoPlaceContainer(ref, ...airports);
	}
}
