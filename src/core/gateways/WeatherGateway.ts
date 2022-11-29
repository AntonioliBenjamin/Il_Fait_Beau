import { Weather } from "./../entities/Weather";

export interface WeatherGateway {
  GetByCity(city: string): Promise<Weather>;
}
