import { MongoDbWeatherModel } from "./models/MongoDbWeather";
import { Weather } from "../../core/entities/Weather";
import { WeatherRepository } from "./../../core/repositories/WeatherRepository";
import { MongoDbWeatherMapper } from "./mappers/MongoDbWeatherMapper";
const mongoDbWeatherMapper = new MongoDbWeatherMapper();

export class MongoDbWeatherRepository implements WeatherRepository {
  
  async save(weather: Weather): Promise<Weather> {
    const weatherFromDomain = mongoDbWeatherMapper.fromDomain(weather);
    const weatherModel = new MongoDbWeatherModel(weatherFromDomain);
    await weatherModel.save();
    return weather;
  }

  async getByCity(city: string): Promise<Weather> {
    const weather = await MongoDbWeatherModel.findOne({ city: city });
    if (!weather) {
      return null;
    }
    return mongoDbWeatherMapper.toDomain(weather);
  }

  async getByCoordinate(lat: number, lon: number): Promise<Weather> {
    const weather = await MongoDbWeatherModel.findOne({ lat: lat, lon : lon});
    if (!weather) {
      return null;
    }
    return mongoDbWeatherMapper.toDomain(weather);
  }

  async deleteAll(input: void): Promise<void> {
    return await MongoDbWeatherModel.remove({});
  }
}
