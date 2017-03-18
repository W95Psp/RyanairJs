import {RyanairGeoPlace} from './RyanairGeoPlace';
import {RyanairContext} from './RyanairContext';
import {Country} from './Country';
import {Region} from './Region';
import {Airport} from './Airport';
import {Route} from './Route';

export class FareDetail {
	type: string;
	amount: number;
	count: number;
	hasDiscount: boolean;
	publishedFare: number;
	discountInPercent: number;
	hasPromoDiscount: boolean;
	constructor({type,amount,count,hasDiscount,publishedFare,discountInPercent,hasPromoDiscount}) {
		this.type = type;
		this.amount = amount;
		this.count = count;
		this.hasDiscount = hasDiscount;
		this.publishedFare = publishedFare;
		this.discountInPercent = discountInPercent;
		this.hasPromoDiscount = hasPromoDiscount;
	}
}
export class Fare {
	fareKey: string;
	fareClass: string;
	fares: FareDetail[];

	constructor({fareKey, fareClass, fares}) {
		this.fareKey = fareKey;
		this.fareClass = fareClass;
		this.fares = fares.map(f => new FareDetail(f));
	}
}

export class Flight {
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

	constructor(ref: RyanairContext, route: Route, currency:string, {flightNumber, time, timeUTC, duration, flightKey, faresLeft, infantsLeft, regularFare, businessFare, leisureFare}) {
		this.ref = ref;
		this.currency = currency;
		this.route = route;
		this.number = flightNumber;
		this.departureDate = new Date(time[0]);
		this.arrivalDate = new Date(time[1]);
		this.departureDateUTC = new Date(timeUTC[0]);
		this.arrivalDateUTC = new Date(timeUTC[1]);
		this.duration = duration;
		this.faresLeft = faresLeft;
		this.flightKey = flightKey;
		this.infantsLeft = infantsLeft;
		this.regularFare = new Fare(regularFare);
		this.businessFare = new Fare(businessFare);
		this.leisureFare = new Fare(leisureFare);
	}

	getFaresDetails() {
		return [...this.regularFare.fares, ...this.businessFare.fares, ...this.leisureFare.fares];
	}

	getBestPrice() {
		return Math.min(...this.getFaresDetails().map(f => f.publishedFare));
	}

	getFlightLightDescription() {
		let o = new FlightLightDescription(this.ref);
		o.arrivalDate = this.arrivalDate;
		o.departureDate = this.departureDate;
		o.currencyCode = this.currency;
		o.currencySymbol = null;
		o.price = this.getBestPrice();
		o.route = this.route;
		return o;
	}
}
export class FlightLightDescription {
	ref: RyanairContext;
	route: Route;
	departureDate: Date;
	arrivalDate: Date;
	price: number;
	currencyCode: string;
	currencySymbol: string;
	constructor(ref: RyanairContext){
		this.ref = ref;
	}
	build({outbound}) {
		let {departureAirport, arrivalAirport, departureDate, arrivalDate, price} = outbound;
		this.route = new Route(this.ref, 
				this.ref.airports.get(departureAirport.iataCode),
				this.ref.airports.get(arrivalAirport.iataCode)
			);
		this.departureDate = new Date(departureDate);
		this.arrivalDate = new Date(arrivalDate);
		this.price = price.value;
		this.currencyCode = price.currencyCode;
		this.currencySymbol = price.currencySymbol;
	}
}