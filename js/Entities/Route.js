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
const Flight_1 = require("./Flight");
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
class Route {
    constructor(ref, airportFrom, airportTo) {
        this.ref = ref;
        this.airportTo = airportTo;
        this.airportFrom = airportFrom;
    }
    findTo(date, flex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            for (let cflex = 0; cflex <= flex; cflex += 6)
                (yield this._findTo(addDays(date, cflex), Math.min(6, flex - cflex))).forEach(r => results.push(r));
            return results;
        });
    }
    _findTo(date, flex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let [from, to] = [this.airportFrom.iataCode, this.airportTo.iataCode];
            let data = yield apiCall_1.apiCall(apiCall_1.ryanairApiUrl.getFaresForDay(date, from, to, flex));
            let list = data.trips.reduce((p, c) => p.concat(c.dates.reduce((p, c) => p.concat(c.flights), [])), []);
            return list.filter(d => d.regularFare).map(desc => new Flight_1.Flight(this.ref, this, data.currency, desc));
        });
    }
}
exports.Route = Route;
