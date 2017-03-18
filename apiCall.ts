import * as request from 'request';
import * as fs from 'fs';
import {RyanairContext} from './RyanairContext';
import {treatData} from './base';

export let getData = async (cache: boolean = false) : Promise<RyanairContext> => {
	return treatData(<any>await apiCall(ryanairApiUrl.data(), cache ? 'cache.json' : null));
};

let fp = 'https://api.ryanair.com/farefinder/3/oneWayFares?&departureAirportIataCode=';
let prefix = 'https://desktopapps.ryanair.com/en-gb/availability?&';
let ppDate = d => [d.getFullYear(),('0'+(1+d.getMonth())).substr(-2),('0'+d.getDate()).substr(-2)].join('-');
export let ryanairApiUrl = {
	data: () => 'https://api.ryanair.com/aggregate/3/common?embedded=airports,countries,cities,regions&market=en-gb',
	getFaresAnyDestination: (iata: string, dateFrom: Date, dateTo: Date = dateFrom) => 
		`${fp}${iata}&market=en-g&outboundDepartureDateFrom=${ppDate(dateFrom)}&outboundDepartureDateTo=${ppDate(dateTo)}`,
	getFares: (iataFrom: string, iataTo: string, dateFrom: Date, dateTo: Date = dateFrom) => 
		ryanairApiUrl.getFaresAnyDestination(iataFrom, dateFrom, dateTo)+'&arrivalAirportIataCode='+iataTo,
	getFaresForDay: (date: Date, from: string, to: string, flex: number = 0) =>
		prefix+`DateOut=${ppDate(date)}&Origin=${from}&Destination=${to}&FlexDaysOut=${flex}`
}


export let apiCall = async (url: string, cache:null|string=null) => {
	let raw;
	if(cache && fs.existsSync(cache))
		raw = fs.readFileSync(cache).toString();
	else{
		raw = await new Promise(a => request(url, {}, (err, val) => a(val.body)));
		if(cache)
			fs.writeFileSync(cache, raw);
	}
	return JSON.parse(raw);
};
