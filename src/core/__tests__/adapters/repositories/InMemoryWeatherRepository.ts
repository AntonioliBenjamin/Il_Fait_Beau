import { Weather } from "../../../entities/Weather";
import { WeatherRepository } from "./../../../repositories/WeatherRepository";

export class InMemoryWeatherRepository implements WeatherRepository {
  constructor(private readonly db: Map<string, Weather>) {}

  exist(city: string): Weather {
    const values = Array.from(this.db.values());
    const result = values.find((elm) => elm.props.city === city);
    if (!result) {
      return null;
    }
    return this.db.get(city);
  }
  save(weather: Weather): Weather {
    this.db.set(weather.props.city, weather);
    return weather;
  }
}
