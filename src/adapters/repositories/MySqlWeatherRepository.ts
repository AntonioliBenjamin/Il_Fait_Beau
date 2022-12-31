import { Weather } from '../../core/entities/Weather';
import { WeatherRepository } from '../../core/repositories/WeatherRepository';
import { SqlMapper } from './mappers/SqlMapper';
import { WeatherSqlModel } from './models/SqlWeather';
const sqlMapper = new SqlMapper()

export class MySqlWeatherRepository implements WeatherRepository {
    async getByCity(city: string): Promise<Weather> {
        const weatherModel = await WeatherSqlModel.findOne({ where: { city : city }})
        console.log(weatherModel)
        if(!weatherModel) {
          return null
        }
        const weather = sqlMapper.toDomain(weatherModel)
        return weather
    }

    getByCoordinate(lat: number, lon: number): Promise<Weather> {
        throw new Error('Method not implemented.');
    }

    async save(weather: Weather): Promise<Weather> {
      const weatherModel = sqlMapper.fromDomain(weather)
      await WeatherSqlModel.create({
        city: weatherModel.dataValues.city,
        createdAt: weatherModel.dataValues.createdAt,
        humidity: weatherModel.dataValues.humidity,
        lat: weatherModel.dataValues.lat,
        lon: weatherModel.dataValues.lon,
        tempInCelcius: weatherModel.dataValues.tempInCelcius,
        windSpeed: weatherModel.dataValues.windSpeed
      })
      return weather
    }

    deleteAll(input: void): Promise<void> {
        throw new Error('Method not implemented.');
    } 
}
