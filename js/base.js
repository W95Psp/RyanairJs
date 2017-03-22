"use strict";
const RyanairContext_1 = require("./Entities/RyanairContext");
const Country_1 = require("./Entities/Country");
const Airport_1 = require("./Entities/Airport");
const City_1 = require("./Entities/City");
const Region_1 = require("./Entities/Region");
exports.treatData = ({ regions, cities, countries, airports }) => {
    let o = new RyanairContext_1.RyanairContext();
    let singToPlur = { country: 'countries', airport: 'airports', region: 'regions', city: 'cities' };
    let trRoutes = (l) => l.map(o => o.split(':'))
        .map(([t, c]) => o[singToPlur[t]].get(c));
    [
        ...regions.map(r => {
            let y = new Region_1.Region(o);
            o.regions.set(r.code, y);
            return () => y.build(r, r.cites.map(({ code }) => o.cities.get(code)));
        }),
        ...cities.map(r => {
            let y = new City_1.City(o);
            o.cities.set(r.code, y);
            return () => y.build(r, o.countries.get(r.countryCode));
        }),
        ...countries.map(r => {
            let y = new Country_1.Country(o);
            o.countries.set(r.code, y);
            return () => y.build(r);
        }),
        ...airports.map(r => {
            let y = new Airport_1.Airport(o);
            o.airports.set(r.iataCode, y);
            return () => y.build(r, o.countries.get(r.countryCode), o.regions.get(r.regionCode), o.cities.get(r.cityCode), trRoutes(r.routes), trRoutes(r.seasonalRoutes));
        })
    ].map(f => f());
    o.regions.forEach(r => r.country = r.cities[0].country);
    o.regions.forEach(r => r.airports = [...o.airports.values()].filter(a => a.region == r));
    o.cities.forEach(c => c.region = [...o.regions.values()].filter(r => r.cities.indexOf(c) != -1)[0]);
    o.cities.forEach(c => c.airports = [...o.airports.values()].filter(a => a.city == c));
    o.countries.forEach(c => c.airports = [...o.airports.values()].filter(a => a.country == c));
    o.countries.forEach(c => c.cities = [...o.cities.values()].filter(a => a.country == c));
    o.countries.forEach(c => c.regions = [...o.regions.values()].filter(r => r.country == c));
    return o;
};
