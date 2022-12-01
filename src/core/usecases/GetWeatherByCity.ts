import { Weather } from "./../entities/Weather";
import { WeatherGateway } from "./../gateways/WeatherGateway";
import { WeatherRepository } from "./../repositories/WeatherRepository";
import { UseCase } from "./Usecase";

export class GetWeatherByCity implements UseCase<string, Weather> {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly weatherGateway: WeatherGateway
  ) {}

  async execute(city: string): Promise<Weather> {
    const isAlreadyExists = await this.weatherRepository.getByCity(city);
    if (isAlreadyExists) {
      return isAlreadyExists;
    }
    const getWeather = await this.weatherGateway.getByCity(city);
    const weather = Weather.create(getWeather.props);
    return this.weatherRepository.save(weather);
  }
}