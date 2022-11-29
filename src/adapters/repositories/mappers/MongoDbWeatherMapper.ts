import { MongoDbWeatherModel, MongoDbWeatherSchemaProperties } from './../models/MongoDbWeather';
import { Weather } from '../../../core/entities/Weather';
import { Mapper } from './mapper';

export class MongoDbWeatherMapper implements Mapper<Weather,MongoDbWeatherSchemaProperties >{
    toDomain(raw: MongoDbWeatherSchemaProperties): Weather {
        throw new Error('Method not implemented.');
    }
    fromDomain(date: Weather): MongoDbWeatherSchemaProperties {
        throw new Error('Method not implemented.');
    }

}