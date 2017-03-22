import {RyanairGeoPlace} from './RyanairGeoPlace';
import {Country} from './Country';
import {Airport} from './Airport';
import {City} from './City';

export class Region extends RyanairGeoPlace {
	name: string;
	code: string;
	country: Country;
	cities: City[];
	airports: Airport[];

	build({name, code}, cities: City[]){
		[this.name, this.code, this.cities] = [name, code, cities];
	}
}