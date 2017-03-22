"use strict";
const RyanairGeoPlace_1 = require("./RyanairGeoPlace");
class Country extends RyanairGeoPlace_1.RyanairGeoPlace {
    build({ name, code, currency }) {
        [this.name, this.code, this.currency] = [name, code, currency];
    }
}
exports.Country = Country;
