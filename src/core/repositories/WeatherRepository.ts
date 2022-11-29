import { Weather } from "./../entities/Weather";
export interface WeatherRepository {
  exist(city: string): Weather;

  save(weather: Weather): Weather;
}
