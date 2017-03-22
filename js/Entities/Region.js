"use strict";
const RyanairGeoPlace_1 = require("./RyanairGeoPlace");
class Region extends RyanairGeoPlace_1.RyanairGeoPlace {
    build({ name, code }, cities) {
        [this.name, this.code, this.cities] = [name, code, cities];
    }
}
exports.Region = Region;
