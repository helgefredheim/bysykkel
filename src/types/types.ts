export interface Stasjon {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

export type Stasjoner = Array<Stasjon>;

export interface Stasjonsinformasjon {
  last_updated: number;
  ttl: number;
  data: {
    stations: Stasjoner;
  };
}

export interface StasjonsstatusElement {
  station_id: string;
  is_installed: boolean;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
}

export type StasjonsstatusElementliste = StasjonsstatusElement[];

export interface Stasjonsstatus {
  last_updated: number;
  ttl: number;
  data: {
    stations: StasjonsstatusElementliste;
  };
}

export interface BeriketStasjon extends Stasjon {
  status: StasjonsstatusElement;
}
