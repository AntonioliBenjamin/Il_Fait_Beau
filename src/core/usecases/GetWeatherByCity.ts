import { Weather } from './../entities/Weather';
import { WeatherGateway } from './../gateways/WeatherGateway';
import { WeatherRepository } from './../repositories/WeatherRepository';
import { UseCase } from './Usecase';

export class GetWeatherByCity implements UseCase<string, Promise<Weather>> {
    constructor(
        private readonly weatherRepository: WeatherRepository,
        private readonly weatherGateway: WeatherGateway
    ) {}

    async execute(city: string): Promise<Weather> {
        const isAlreadyExists = await this.weatherRepository.exist(city)
        if (isAlreadyExists) {
            return isAlreadyExists
        }
        const weather = await this.weatherGateway.GetByCity(city)
        return this.weatherRepository.save(weather)
    }
    
}