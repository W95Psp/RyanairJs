import {Country, Region, City, Route, Flight, FlightLightDescription} from './main';
import {getData} from './apiCall';

(async () => {
	let {
		regions, cities,
		countries, airports
	} = await getData(true);
	let x = await countries.get('fr').findTo(countries.get('mt'), new Date(), 100);
	// let x = await airports.get('MRS').findAll(new Date(), 30);
	// let x = await airports.get('MPL').findAny(new Date(), new Date('2017-05-25'));
	// console.log(await apiCall(ryanairApiUrl.data()))
	console.log(x.map(o => o.getFlightLightDescription())
				.sort((a, b) => a.price > b.price ? -1 : 1)
				.map(({price, departureDate, arrivalDate, route}) => 
			({price, departureDate, arrivalDate, to: route.airportTo.name, from: route.airportFrom.name})));
})();

