import {RyanairContext} from './RyanairContext';
import {Country} from './Country';
import {Airport} from './Airport';
import {Region} from './Region';
import {Flight} from './Flight';
import {City} from './City';
import {Route} from './Route';

export class RyanairGeoPlace {
	ref: RyanairContext;
	constructor(ref: RyanairContext){
		this.ref = ref;
	}

	async findTo(dest: Region | City | Country | Airport, date: Date, searchWithInNDays = 0): Promise<Flight[]>{
		let sources:any = this.constructor.name=='Airport' ? [this] : <Airport[]>(<any>this).airports;
		let destinations:any = dest.constructor.name=='Airport' ? [dest] : (<any>dest).airports;

		let routesNotFlat = sources.map(src => 
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
		let sources:any = this.constructor.name=='Airport' ? [this] : <Airport[]>(<any>this).airports;
		let routes = sources.reduce((p, c) => p.concat(c.routes), []);
		for(let route of routes)
			(await route.findTo(date, searchWithInNDays)).forEach(r => results.push(r));
		return results;
	}

	// async findTo(dest: Region | City | Country | Airport, date: Date, searchWithInNDays = 0): Promise<Flight[]>{
	// 	let sources = this instanceof Airport ? [this] : <Airport[]>(<any>this).airports;
	// 	let destinations = dest instanceof Airport ? [dest] : dest.airports;

	// 	let routesNotFlat = sources.map(src => 
	// 		destinations
	// 			.filter(dest => src.routes.find(r => r.airportTo==dest))
	// 			.map(dest => new Route(this.ref, src, dest))
	// 	);
	// 	let routes = routesNotFlat.reduce((p, c) => p.concat(c), []);
	// 	let results = [];
	// 	for(let route of routes)
	// 		results.push(await route.findTo(date, searchWithInNDays));
	// 	results.reduce((p, c) => p.concat(c), []);
	// 	return results.reduce((p, c) => p.concat(c), []);
	// }

	// async findAll(date: Date, searchWithInNDays = 0){
	// 	let results = <Flight[]>[];
	// 	let sources = this instanceof Airport ? [this] : <Airport[]>(<any>this).airports;
	// 	let routes = sources.reduce((p, c) => p.concat(c.routes), []);
	// 	for(let route of routes)
	// 		(await route.findTo(date, searchWithInNDays)).forEach(r => results.push(r));
	// 	return results;
	// }
}