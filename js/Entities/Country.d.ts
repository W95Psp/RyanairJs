import { RyanairGeoPlace } from './RyanairGeoPlace';
import { City } from './City';
import { Region } from './Region';
import { Airport } from './Airport';
export declare class Country extends RyanairGeoPlace {
    name: string;
    code: string;
    currency: string;
    cities: City[];
    regions: Region[];
    airports: Airport[];
    build({name, code, currency}: {
        name: any;
        code: any;
        currency: any;
    }): void;
}
