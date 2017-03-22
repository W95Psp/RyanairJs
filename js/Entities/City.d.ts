import { RyanairGeoPlace } from './RyanairGeoPlace';
import { Country } from './Country';
import { Region } from './Region';
import { Airport } from './Airport';
export declare class City extends RyanairGeoPlace {
    name: string;
    code: string;
    country: Country;
    region: Region;
    airports: Airport[];
    build({name, code}: {
        name: any;
        code: any;
    }, country: any): void;
}
