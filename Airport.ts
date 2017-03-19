import {ryanairApiUrl, apiCall} from './apiCall';
import {RyanairGeoPlace} from './RyanairGeoPlace';
import {Country} from './Country';
import {Region} from './Region';
import {City} from './City';
import {Route} from './Route';
import {Flight, FlightLightDescription} from './Flight';
import {GPSPoint} from './GPSPoint';

export class Airport extends RyanairGeoPlace {
	iataCode: string;
	name: string;
	seoName: string;
	coordinates: GPSPoint;
	base: boolean;
	country: Country;
	region: Region;
	city: City;
	currencyCode: string;
	routes: Route[];
	seasonalRoutes: Route[];
	destinations: (Country | City | Region | Airport)[];//type:code
	seasonalDestinations: string[];
	categories: string[];
	priority: number;
	async findAny_anyTime(from: Date, to: Date): Promise<FlightLightDescription[]>{
		let data:any = await apiCall(ryanairApiUrl.getFaresAnyDestination(this.iataCode, from, to));
		return data.fares.map(f => {
			let o = new FlightLightDescription(this.ref);
			o.build(f);
			return o;
		});
	}
	
	build({
			iataCode, name, seoName, coordinates, base,
			currencyCode, categories, priority
		}, country, region, city, routes, seasonalRoutes){
		[this.iataCode, this.name, this.seoName, this.base
			, this.currencyCode, this.categories, this.priority] = [
			iataCode, name, seoName, base,
			currencyCode, categories, priority
		];
		[this.country, this.region, this.city, this.destinations, this.seasonalDestinations] =
				[country, region, city, routes, seasonalRoutes];

		let f = (p:any) => p instanceof Airport;
		this.routes = this.destinations.filter(f).map(d => new Route(this.ref, this, <any>d));
		this.seasonalRoutes = this.seasonalDestinations.filter(f).map(d => new Route(this.ref, this, <any>d));
		this.coordinates = new GPSPoint(coordinates.latitude, coordinates.longitude);
	}
}
