import {RyanairGeoPlace} from './RyanairGeoPlace';
import {Country} from './Country';
import {Region} from './Region';
import {Airport} from './Airport';

export class City extends RyanairGeoPlace {
	name: string;
	code: string;
	country: Country;
	region: Region;
	airports: Airport[];

	build({name, code}, country){
		[this.name, this.code, this.country] = [name, code, country];
	}
}