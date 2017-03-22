"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiCall_1 = require("../apiCall");
const RyanairGeoPlace_1 = require("./RyanairGeoPlace");
const Route_1 = require("./Route");
const Flight_1 = require("./Flight");
const GPSPoint_1 = require("./GPSPoint");
class Airport extends RyanairGeoPlace_1.RyanairGeoPlace {
    findAny_anyTime(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield apiCall_1.apiCall(apiCall_1.ryanairApiUrl.getFaresAnyDestination(this.iataCode, from, to));
            return data.fares.map(f => {
                let o = new Flight_1.FlightLightDescription(this.ref);
                o.build(f);
                return o;
            });
        });
    }
    build({ iataCode, name, seoName, coordinates, base, currencyCode, categories, priority }, country, region, city, routes, seasonalRoutes) {
        [this.iataCode, this.name, this.seoName, this.base,
            this.currencyCode, this.categories, this.priority] = [
            iataCode, name, seoName, base,
            currencyCode, categories, priority
        ];
        [this.country, this.region, this.city, this.destinations, this.seasonalDestinations] =
            [country, region, city, routes, seasonalRoutes];
        let f = (p) => p instanceof Airport;
        this.routes = this.destinations.filter(f).map(d => new Route_1.Route(this.ref, this, d));
        this.seasonalRoutes = this.seasonalDestinations.filter(f).map(d => new Route_1.Route(this.ref, this, d));
        this.coordinates = new GPSPoint_1.GPSPoint(coordinates.latitude, coordinates.longitude);
    }
}
exports.Airport = Airport;
