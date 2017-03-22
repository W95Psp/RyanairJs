export declare class GPSPoint {
    longitude: number;
    latitude: number;
    constructor(latitude: number, longitude: number);
    distanceTo(point: GPSPoint): number;
    static mean(...points: GPSPoint[]): GPSPoint;
}
