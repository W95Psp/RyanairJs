import { RyanairContext } from './RyanairContext';
import { Flight } from './Flight';
import { Airport } from './Airport';
export declare class Route {
    ref: RyanairContext;
    airportFrom: Airport;
    airportTo: Airport;
    constructor(ref: RyanairContext, airportFrom: Airport, airportTo: Airport);
    findTo(date: Date, flex?: number): Promise<Flight[]>;
    private _findTo(date, flex?);
}
