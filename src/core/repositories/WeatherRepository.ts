import { Weather } from "./../entities/Weather";
export interface WeatherRepository {
  getByCity(city: string): Promise<Weather>;

  getByCoordinate(lat: number, lon: number): Promise<Weather>;

  save(weather: Weather): Promise<Weather>;

  deleteAll(input: void): Promise<void>;
}
