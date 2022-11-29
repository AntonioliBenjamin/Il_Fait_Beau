import { Mapper } from './../../../adapters/repositories/mappers/mapper';
import { Weather } from './../../../core/entities/Weather';


export class OpenWeatherMapperTest implements Mapper<Weather, any> {
    toDomain(raw: any): Weather {
        return new Weather({
            city: raw.data.name.toLowerCase(),
            humidity: raw.data.main.humidity,
            temp_c: raw.data.main.temp - 273,
            windSpeed: raw.data.wind.speed,
        })
    }
    fromDomain(date: Weather) {
        throw new Error('Method not implemented.');
    }

}