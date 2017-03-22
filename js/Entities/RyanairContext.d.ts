import { Country } from './Country';
import { Airport } from './Airport';
import { Region } from './Region';
import { City } from './City';
export declare class RyanairContext {
    regions: Map<String, Region>;
    cities: Map<String, City>;
    countries: Map<String, Country>;
    airports: Map<String, Airport>;
    getCountryByName(name: string): Country;
    getCityByName(name: string): City;
    getRegionByName(name: string): Region;
}
