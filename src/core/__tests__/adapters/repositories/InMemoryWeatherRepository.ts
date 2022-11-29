import { Weather } from "../../../entities/Weather";
import { WeatherRepository } from "./../../../repositories/WeatherRepository";

export class InMemoryWeatherRepository implements WeatherRepository {
  constructor(private readonly db: Map<string, Weather>) {}

    async coordinateExist(lat: number, lon: number): Promise<Weather> {
        const values = Array.from(this.db.values());
        const result = values.find((elm) => elm.props.lat === lat && elm.props.lon === lon);
        if (!result) {
          return null;
        }
        return this.db.get(result.props.city);
    }

    async cityExist(city: string): Promise<Weather> {
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
