"use strict";
const Route_1 = require("./Route");
class FareDetail {
    constructor({ type, amount, count, hasDiscount, publishedFare, discountInPercent, hasPromoDiscount }) {
        this.type = type;
        this.amount = amount;
        this.count = count;
        this.hasDiscount = hasDiscount;
        this.publishedFare = publishedFare;
        this.discountInPercent = discountInPercent;
        this.hasPromoDiscount = hasPromoDiscount;
    }
}
exports.FareDetail = FareDetail;
class Fare {
    constructor({ fareKey, fareClass, fares }) {
        this.fareKey = fareKey;
        this.fareClass = fareClass;
        this.fares = fares.map(f => new FareDetail(f));
    }
}
exports.Fare = Fare;
class Flight {
    constructor(ref, route, currency, { flightNumber, time, timeUTC, duration, flightKey, faresLeft, infantsLeft, regularFare, businessFare, leisureFare }) {
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
exports.Flight = Flight;
class FlightLightDescription {
    constructor(ref) {
        this.ref = ref;
    }
    build({ outbound }) {
        let { departureAirport, arrivalAirport, departureDate, arrivalDate, price } = outbound;
        this.route = new Route_1.Route(this.ref, this.ref.airports.get(departureAirport.iataCode), this.ref.airports.get(arrivalAirport.iataCode));
        this.departureDate = new Date(departureDate);
        this.arrivalDate = new Date(arrivalDate);
        this.price = price.value;
        this.currencyCode = price.currencyCode;
        this.currencySymbol = price.currencySymbol;
    }
}
exports.FlightLightDescription = FlightLightDescription;
