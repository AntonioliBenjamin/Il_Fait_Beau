import { Weather } from "./../entities/Weather";

export interface WeatherGateway {
  GetByCity(city: string): Promise<Weather>;

  GetWeatherByCoordinate(lon : number, lat : number): Promise<Weather>
}
