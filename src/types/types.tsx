export interface Stasjon {
    station_id: string;
    name: string;
    address: string;
    lat: number;
    lon: number,
    capacity: number
}

export type Stasjoner = Array<Stasjon>;

export interface Stasjonsinformasjon {
    last_updated: number;
    ttl: number;
    data: {
        stations: Stasjoner
    }
}
