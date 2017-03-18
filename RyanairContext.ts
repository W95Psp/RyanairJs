import {Country} from './Country';
import {Airport} from './Airport';
import {Region} from './Region';
import {City} from './City';

export type RyanairContext = {
	regions: Map<String, Region>,
	cities: Map<String, City>,
	countries: Map<String, Country>,
	airports: Map<String, Airport>
};