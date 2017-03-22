"use strict";
const RyanairGeoPlace_1 = require("./RyanairGeoPlace");
class City extends RyanairGeoPlace_1.RyanairGeoPlace {
    build({ name, code }, country) {
        [this.name, this.code, this.country] = [name, code, country];
    }
}
exports.City = City;
