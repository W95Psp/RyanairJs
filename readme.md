# RyanairJs
Lib exploiting Ryanair API written in TypeScript.

## Install
`npm i --save ryanair`

## Use with TypeScript
After installation, just import it:

`import * as ryanair from 'ryanair';`

Then, you need to fetch all Ryanair informations (like Aiports description, cities descriptions, routes...):

`let ctx = await ryanair.getData();`

If you want theses information to be cached, use `ryanair.getData(true);`; 

### RyanairContext
`getData` returns a promise returning a `RyanairContext` instance.

Class `RyanairContext` is a collection of Map from string code to regions, cities, countries, airports. For example, knowing `MTL` is the code for the airport of Montpellier, `(await getData()).airports.get('MPL')` will return an `Airport` instance witch represent the airport of Montpellier.

#### Attributes
 - `regions: Map<String, Region>`
 - `cities: Map<String, City>`
 - `countries: Map<String, Country>`
 - `airports: Map<String, Airport>`

#### Methods
 - `getCountryByName(name: string) : Country`
 - `getCityByName(name: string) : City`
 - `getRegionByName(name: string) : Region`
 
### RyanairGeoPlace
`Airport`, `City`, `Region` or `Country` are extentions of `RyanairGeoPlace`.

A `RyanairGeoPlace` is basically a list of airport.

#### Methods
 - `async findTo(dest: RyanairGeoPlace, date: Date, searchWithInNDays = 0): Promise<Flight[]>` 
 - `async findAll(date: Date, searchWithInNDays = 0)`
 - `getGeoContainer(): RyanairGeoPlaceContainer`
 - `union(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer`
 - `intersect(...list: RyanairGeoPlace[]) : RyanairGeoPlaceContainer`
 - `getNearbyAirports(howFarKm: number) : RyanairGeoPlaceContainer`
