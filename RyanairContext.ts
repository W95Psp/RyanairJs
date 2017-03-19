import {Country} from './Country';
import {Airport} from './Airport';
import {Region} from './Region';
import {City} from './City';

let extract = (s, n) => [...s.values()].filter(c => c.name == n);
export class RyanairContext {
	regions: Map<String, Region> = new Map<String, Region>();
	cities: Map<String, City> = new Map<String, City>();
	countries: Map<String, Country> = new Map<String, Country>();
	airports: Map<String, Airport> = new Map<String, Airport>();

	getCountryByName(name: string) : Country {
		return extract(this.countries, name)[0];
	};
	getCityByName(name: string) : City {
		return extract(this.cities, name)[0];
	};
	getRegionByName(name: string) : Region {
		return extract(this.regions, name)[0];
	};
};