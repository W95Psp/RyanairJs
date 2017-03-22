"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Route_1 = require("./Route");
const GPSPoint_1 = require("./GPSPoint");
let extractAirports = (o) => o.constructor.name == 'Airport' ? [o] : [...o.airports];
class RyanairGeoPlace {
    constructor(ref) {
        this.ref = ref;
    }
    findTo(dest, date, searchWithInNDays = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let destinations = extractAirports(dest);
            let routesNotFlat = extractAirports(this).map(src => destinations
                .filter(dest => src.routes.find(r => r.airportTo == dest))
                .map(dest => new Route_1.Route(this.ref, src, dest)));
            let routes = routesNotFlat.reduce((p, c) => p.concat(c), []);
            let results = [];
            for (let route of routes)
                results.push(yield route.findTo(date, searchWithInNDays));
            results.reduce((p, c) => p.concat(c), []);
            return results.reduce((p, c) => p.concat(c), []);
        });
    }
    findAll(date, searchWithInNDays = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            let sources = extractAirports(this);
            let routes = sources.reduce((p, c) => p.concat(c.routes), []);
            for (let route of routes)
                (yield route.findTo(date, searchWithInNDays)).forEach(r => results.push(r));
            return results;
        });
    }
    getGeoContainer() {
        return new RyanairGeoPlaceContainer(this.ref, ...extractAirports(this));
    }
    union(...list) {
        return this.getGeoContainer()._union(...list.map(o => o.getGeoContainer()));
    }
    intersect(...list) {
        return this.getGeoContainer()._intersect(...list.map(o => o.getGeoContainer()));
    }
    getNearbyAirports(howFarKm) {
        return RyanairGeoPlaceContainer._getNearbyAirports(this.ref, this, howFarKm);
    }
}
exports.RyanairGeoPlace = RyanairGeoPlace;
let extractAirportsFromList = (list) => {
    return list.reduce((p, c) => p.concat(extractAirports(c)), []);
};
class RyanairGeoPlaceContainer extends RyanairGeoPlace {
    constructor(ref, ...list) {
        super(ref);
        this.airports = new Set();
        this.airports = new Set(extractAirportsFromList(list));
    }
    _union(...list) {
        let airports = extractAirportsFromList(list);
        return new RyanairGeoPlaceContainer(this.ref, ...[...this.airports, ...airports]);
    }
    _intersect(...list) {
        let airports = extractAirportsFromList(list).filter(a => this.airports.has(a));
        return new RyanairGeoPlaceContainer(this.ref, ...[...this.airports, ...airports]);
    }
    static _getNearbyAirports(ref, sources, howFarKm) {
        let point;
        if (sources.constructor.name == 'GPSPoint')
            point = sources;
        else
            point = GPSPoint_1.GPSPoint.mean(...extractAirports(sources).map(a => a.coordinates));
        let airports = [...ref.airports.values()].filter(a => a.coordinates.distanceTo(point) <= howFarKm);
        return new RyanairGeoPlaceContainer(ref, ...airports);
    }
}
exports.RyanairGeoPlaceContainer = RyanairGeoPlaceContainer;
