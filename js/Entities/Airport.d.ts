import { RyanairGeoPlace } from './RyanairGeoPlace';
import { Country } from './Country';
import { Region } from './Region';
import { City } from './City';
import { Route } from './Route';
import { FlightLightDescription } from './Flight';
import { GPSPoint } from './GPSPoint';
export declare class Airport extends RyanairGeoPlace {
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
    destinations: (Country | City | Region | Airport)[];
    seasonalDestinations: string[];
    categories: string[];
    priority: number;
    findAny_anyTime(from: Date, to: Date): Promise<FlightLightDescription[]>;
    build({iataCode, name, seoName, coordinates, base, currencyCode, categories, priority}: {
        iataCode: any;
        name: any;
        seoName: any;
        coordinates: any;
        base: any;
        currencyCode: any;
        categories: any;
        priority: any;
    }, country: any, region: any, city: any, routes: any, seasonalRoutes: any): void;
}
