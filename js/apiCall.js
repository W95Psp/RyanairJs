"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("request");
const fs = require("fs");
const base_1 = require("./base");
exports.getData = (cache = false) => __awaiter(this, void 0, void 0, function* () {
    return base_1.treatData(yield exports.apiCall(exports.ryanairApiUrl.data(), cache ? 'cache.json' : null));
});
let fp = 'https://api.ryanair.com/farefinder/3/oneWayFares?&departureAirportIataCode=';
let prefix = 'https://desktopapps.ryanair.com/en-gb/availability?&';
let ppDate = d => [d.getFullYear(), ('0' + (1 + d.getMonth())).substr(-2), ('0' + d.getDate()).substr(-2)].join('-');
exports.ryanairApiUrl = {
    data: () => 'https://api.ryanair.com/aggregate/3/common?embedded=airports,countries,cities,regions&market=en-gb',
    getFaresAnyDestination: (iata, dateFrom, dateTo = dateFrom) => `${fp}${iata}&market=en-g&outboundDepartureDateFrom=${ppDate(dateFrom)}&outboundDepartureDateTo=${ppDate(dateTo)}`,
    getFares: (iataFrom, iataTo, dateFrom, dateTo = dateFrom) => exports.ryanairApiUrl.getFaresAnyDestination(iataFrom, dateFrom, dateTo) + '&arrivalAirportIataCode=' + iataTo,
    getFaresForDay: (date, from, to, flex = 0) => prefix + `DateOut=${ppDate(date)}&Origin=${from}&Destination=${to}&FlexDaysOut=${flex}`
};
exports.apiCall = (url, cache = null) => __awaiter(this, void 0, void 0, function* () {
    let raw;
    if (cache && fs.existsSync(cache))
        raw = fs.readFileSync(cache).toString();
    else {
        raw = yield new Promise(a => request(url, {}, (err, val) => a(val.body)));
        if (cache)
            fs.writeFileSync(cache, raw);
    }
    return JSON.parse(raw);
});
