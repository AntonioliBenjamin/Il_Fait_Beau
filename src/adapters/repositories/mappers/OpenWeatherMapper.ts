import { Weather } from './../../../core/entities/Weather';
import { Mapper } from './mapper';

export class OpenWeatherMapper implements Mapper<Weather, any> {
    toDomain(raw: any): Weather {
        return new Weather({
            city: raw.name,
            humidity: raw.humidity,
            temp_c: raw.temp_c,
            windSpeed: raw.windSpeed,
        })
    }
    fromDomain(date: Weather) {
        throw new Error('Method not implemented.');
    }

}