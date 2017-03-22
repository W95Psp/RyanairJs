import { RyanairContext } from './RyanairContext';
import { Route } from './Route';
export declare class FareDetail {
    type: string;
    amount: number;
    count: number;
    hasDiscount: boolean;
    publishedFare: number;
    discountInPercent: number;
    hasPromoDiscount: boolean;
    constructor({type, amount, count, hasDiscount, publishedFare, discountInPercent, hasPromoDiscount}: {
        type: any;
        amount: any;
        count: any;
        hasDiscount: any;
        publishedFare: any;
        discountInPercent: any;
        hasPromoDiscount: any;
    });
}
export declare class Fare {
    fareKey: string;
    fareClass: string;
    fares: FareDetail[];
    constructor({fareKey, fareClass, fares}: {
        fareKey: any;
        fareClass: any;
        fares: any;
    });
}
export declare class Flight {
    ref: RyanairContext;
    number: string;
    route: Route;
    departureDate: Date;
    arrivalDate: Date;
    departureDateUTC: Date;
    arrivalDateUTC: Date;
    duration: string;
    faresLeft: number;
    flightKey: string;
    infantsLeft: number;
    regularFare: Fare;
    businessFare: Fare;
    leisureFare: Fare;
    currency: string;
    constructor(ref: RyanairContext, route: Route, currency: string, {flightNumber, time, timeUTC, duration, flightKey, faresLeft, infantsLeft, regularFare, businessFare, leisureFare}: {
        flightNumber: any;
        time: any;
        timeUTC: any;
        duration: any;
        flightKey: any;
        faresLeft: any;
        infantsLeft: any;
        regularFare: any;
        businessFare: any;
        leisureFare: any;
    });
    getFaresDetails(): FareDetail[];
    getBestPrice(): number;
    getFlightLightDescription(): FlightLightDescription;
}
export declare class FlightLightDescription {
    ref: RyanairContext;
    route: Route;
    departureDate: Date;
    arrivalDate: Date;
    price: number;
    currencyCode: string;
    currencySymbol: string;
    constructor(ref: RyanairContext);
    build({outbound}: {
        outbound: any;
    }): void;
}
