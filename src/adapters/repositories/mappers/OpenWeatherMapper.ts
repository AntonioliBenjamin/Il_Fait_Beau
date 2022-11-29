import { Weather } from './../../../core/entities/Weather';
import { Mapper } from './mapper';

export class OpenWeatherMapper implements Mapper<Weather, Object> {
    toDomain(raw: any): Weather {
        return Weather.create({
          city: raw.data.name.toLowerCase(),
          humidity: raw.data.main.humidity,
          temp_c: raw.data.main.temp - 273,
          windSpeed: raw.data.wind.speed,
          lat: raw.data.coord.lat,
          lon: raw.data.coord.lon
        });
      }
      fromDomain(date: Weather) {
        return {};
      }
}