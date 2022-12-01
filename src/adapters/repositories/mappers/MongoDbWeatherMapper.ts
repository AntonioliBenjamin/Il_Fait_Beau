import { MongoDbWeatherSchemaProperties } from './../models/MongoDbWeather';
import { Weather } from '../../../core/entities/Weather';
import { Mapper } from './mapper';

export class MongoDbWeatherMapper implements Mapper<Weather, MongoDbWeatherSchemaProperties >{
    toDomain(raw: MongoDbWeatherSchemaProperties): Weather {
        const {
            city,
            tempInCelcius,
            humidity,
            windSpeed,
            lat,
            lon,
            createdAt,
        } = raw;
        return new Weather({
            city,
            tempInCelcius: tempInCelcius,
            humidity,
            windSpeed,
            lat,
            lon,
            createdAt: new Date(createdAt),
        })
    }
    fromDomain(weather: Weather): MongoDbWeatherSchemaProperties {
        const {
            city,
            tempInCelcius: tempInCelcius,
            humidity,
            windSpeed,
            lat,
            lon,
            createdAt,
        } = weather.props;
        return {
            city,
            tempInCelcius,
            humidity,
            windSpeed,
            lat,
            lon,
            createdAt: +createdAt,
        }
    }
}