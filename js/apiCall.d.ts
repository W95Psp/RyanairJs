import { RyanairContext } from './Entities/RyanairContext';
export declare let getData: (cache?: boolean) => Promise<RyanairContext>;
export declare let ryanairApiUrl: {
    data: () => string;
    getFaresAnyDestination: (iata: string, dateFrom: Date, dateTo?: Date) => string;
    getFares: (iataFrom: string, iataTo: string, dateFrom: Date, dateTo?: Date) => string;
    getFaresForDay: (date: Date, from: string, to: string, flex?: number) => string;
};
export declare let apiCall: (url: string, cache?: string) => Promise<any>;
