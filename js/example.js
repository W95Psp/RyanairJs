"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main_1 = require("./main");
(() => __awaiter(this, void 0, void 0, function* () {
    let ctx = yield main_1.getData(true);
    // countries.get('fr').
    let southFrance = (yield ctx.airports.get('MPL').getNearbyAirports(100)).union(yield ctx.getCountryByName('France').getNearbyAirports(0));
    console.log([...southFrance.airports].map(o => o.name));
    let x = yield southFrance.findTo(ctx.countries.get('nl').getNearbyAirports(400), new Date(), 100);
    // let x = await airports.get('MRS').findAll(new Date(), 30);
    // let x = await airports.get('MPL').findAny(new Date(), new Date('2017-05-25'));
    // console.log(await apiCall(ryanairApiUrl.data()))
    console.log(x.map(o => o.getFlightLightDescription())
        .sort((a, b) => a.price > b.price ? -1 : 1)
        .map(({ price, departureDate, arrivalDate, route }) => ({ price, departureDate, arrivalDate, to: route.airportTo.name, from: route.airportFrom.name })));
}))();
