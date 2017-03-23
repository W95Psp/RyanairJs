import {Country, Region, City, Route, Flight, FlightLightDescription, getData} from './main';

(async () => {
	let ctx = await getData(true);
	// countries.get('fr').

	let southFrance = (await ctx.airports.get('MPL').getNearbyAirports(100)).union(
		await ctx.getCountryByName('France').getNearbyAirports(0)
	);
	console.log([...southFrance.airports].map(o => o.name));

	let x = await southFrance.findTo(ctx.countries.get('nl').getNearbyAirports(400), new Date(), 100);

	// let x = await airports.get('MRS').findAll(new Date(), 30);
	// let x = await airports.get('MPL').findAny(new Date(), new Date('2017-05-25'));
	// console.log(await apiCall(ryanairApiUrl.data()))
	console.log(x.map(o => o.getFlightLightDescription())
				.sort((a, b) => a.price > b.price ? -1 : 1)
				.map(({price, departureDate, arrivalDate, route}) => 
			({price, departureDate, arrivalDate, to: route.airportTo.name, from: route.airportFrom.name})));
})();

