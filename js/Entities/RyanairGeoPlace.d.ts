import { RyanairContext } from './RyanairContext';
import { Airport } from './Airport';
import { Flight } from './Flight';
import { GPSPoint } from './GPSPoint';
export declare class RyanairGeoPlace {
    ref: RyanairContext;
    constructor(ref: RyanairContext);
    findTo(dest: RyanairGeoPlace, date: Date, searchWithInNDays?: number): Promise<Flight[]>;
    findAll(date: Date, searchWithInNDays?: number): Promise<Flight[]>;
    getGeoContainer(): RyanairGeoPlaceContainer;
    union(...list: RyanairGeoPlace[]): RyanairGeoPlaceContainer;
    intersect(...list: RyanairGeoPlace[]): RyanairGeoPlaceContainer;
    getNearbyAirports(howFarKm: number): RyanairGeoPlaceContainer;
}
export declare class RyanairGeoPlaceContainer extends RyanairGeoPlace {
    airports: Set<Airport>;
    _union(...list: RyanairGeoPlace[]): RyanairGeoPlaceContainer;
    _intersect(...list: RyanairGeoPlace[]): RyanairGeoPlaceContainer;
    constructor(ref: RyanairContext, ...list: RyanairGeoPlace[]);
    static _getNearbyAirports(ref: RyanairContext, sources: GPSPoint | RyanairGeoPlace, howFarKm: number): RyanairGeoPlaceContainer;
}
