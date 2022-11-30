import { OpenWeatherMapper } from './mappers/OpenWeatherMapper';
import { WeatherGateway } from './../../core/gateways/WeatherGateway';
import { Weather } from './../../core/entities/Weather';
import axios from "axios";
const API_KEY = process.env.API_KEY;
const openWeatherMapper = new OpenWeatherMapper();

export class OpenWeatherGateway implements WeatherGateway {
  async getWeatherByCoordinate(lon: number, lat: number): Promise<Weather> {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return openWeatherMapper.toDomain(response);
  }
  async getByCity(city: string): Promise<Weather> {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    return openWeatherMapper.toDomain(response);
  }
}