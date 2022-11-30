import { WeatherGateway } from './../gateways/WeatherGateway';
import { WeatherRepository } from './../repositories/WeatherRepository';
import { Weather } from './../entities/Weather';
import { UseCase } from './Usecase';

export type GetWeatherByCoordinateInput = {
    lon : number;
    lat: number;
}

export class GetWeatherByCoordinate implements UseCase<GetWeatherByCoordinateInput, Promise<Weather>> {
    constructor(
        private readonly weatherRepository: WeatherRepository,
        private readonly weatherGateway: WeatherGateway
      ) {}
   
   
    async execute(input: GetWeatherByCoordinateInput): Promise<Weather> {
        const { lon, lat} = input
        const isExistsInDb = await this.weatherRepository.getByCoordinate(lat, lon);
        
        if (isExistsInDb) {
          return isExistsInDb;
        }
        const getWeather = await this.weatherGateway.getWeatherByCoordinate(lon, lat);
        const weather= Weather.create({
            city: getWeather.props.city,
            humidity: getWeather.props.humidity,
            tempInCelcius: getWeather.props.tempInCelcius,
            windSpeed: getWeather.props.windSpeed,
            lat: getWeather.props.lat,
            lon: getWeather.props.lon,
        });
        return this.weatherRepository.save(weather);
    }

}