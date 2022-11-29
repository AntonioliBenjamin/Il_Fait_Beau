import { Weather } from "./../entities/Weather";
import { WeatherGateway } from "./../gateways/WeatherGateway";
import { WeatherRepository } from "./../repositories/WeatherRepository";
import { UseCase } from "./Usecase";

export class GetWeatherByCity implements UseCase<string, Promise<Weather>> {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly weatherGateway: WeatherGateway
  ) {}

  async execute(city: string): Promise<Weather> {
    const isAlreadyExists = await this.weatherRepository.cityExist(city);
    if (isAlreadyExists) {
      return isAlreadyExists;
    }
    const getWeather = await this.weatherGateway.GetByCity(city);
    const weather= Weather.create({
        city: getWeather.props.city,
        humidity: getWeather.props.humidity,
        temp_c: getWeather.props.temp_c,
        windSpeed: getWeather.props.windSpeed,
        lat: getWeather.props.lat,
        lon: getWeather.props.lon,
    });
    return this.weatherRepository.save(weather);
  }
}
