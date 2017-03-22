"use strict";
let extract = (s, n) => [...s.values()].filter(c => c.name == n);
class RyanairContext {
    constructor() {
        this.regions = new Map();
        this.cities = new Map();
        this.countries = new Map();
        this.airports = new Map();
    }
    getCountryByName(name) {
        return extract(this.countries, name)[0];
    }
    ;
    getCityByName(name) {
        return extract(this.cities, name)[0];
    }
    ;
    getRegionByName(name) {
        return extract(this.regions, name)[0];
    }
    ;
}
exports.RyanairContext = RyanairContext;
;
