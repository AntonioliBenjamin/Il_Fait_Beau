import { Weather } from "../../../entities/Weather";
import { WeatherGateway } from "../../../gateways/WeatherGateway";


export class InMemoryWeatherGateway implements WeatherGateway {
  constructor(private readonly db: Map<string, Weather>) {}

  async getWeatherByCoordinate(lon: number, lat: number): Promise<Weather> {
    const weathers = Array.from(this.db.values());
    const weather = weathers.find(
      (elm) => elm.props.lon === lon && elm.props.lat === lat
    );
    return weather;
  }

  async getByCity(city: string): Promise<Weather> {
    return this.db.get(city);
  }
}
