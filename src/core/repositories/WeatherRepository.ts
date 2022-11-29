import { Weather } from "./../entities/Weather";
export interface WeatherRepository {
  cityExist(city: string): Promise<Weather>;

  coordinateExist(lat: number, lon: number): Promise<Weather>;

  save(weather: Weather): Weather;
}
