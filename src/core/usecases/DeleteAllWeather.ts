import { WeatherRepository } from "./../repositories/WeatherRepository";
import { UseCase } from "./Usecase";

export class DeleteAllWeather implements UseCase<void, void> {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  execute(input: void): void {
    this.weatherRepository.deleteAll();
  }
}
