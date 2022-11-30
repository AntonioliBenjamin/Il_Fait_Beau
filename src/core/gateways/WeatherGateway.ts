import { Weather } from "./../entities/Weather";

export interface WeatherGateway {
  getByCity(city: string): Promise<Weather>;

  getWeatherByCoordinate(lon : number, lat : number): Promise<Weather>
}
