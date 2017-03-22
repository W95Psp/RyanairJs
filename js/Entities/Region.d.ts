import { RyanairGeoPlace } from './RyanairGeoPlace';
import { Country } from './Country';
import { Airport } from './Airport';
import { City } from './City';
export declare class Region extends RyanairGeoPlace {
    name: string;
    code: string;
    country: Country;
    cities: City[];
    airports: Airport[];
    build({name, code}: {
        name: any;
        code: any;
    }, cities: City[]): void;
}
