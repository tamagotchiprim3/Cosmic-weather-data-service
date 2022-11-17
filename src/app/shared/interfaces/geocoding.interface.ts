export interface IGeocodingByCityResponse {
  name: string;
  local_names: Object;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface IGeocodingByZipResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}
