import { OpenWeatherMapperTest } from "./../../mappers/OpenWeatherMapperTest";
import { Weather } from "./../../../entities/Weather";
import { WeatherGateway } from "./../../../gateways/WeatherGateway";
import axios from "axios";
const API_KEY = process.env.API_KEY;
const openWeatherMapperTest = new OpenWeatherMapperTest();

export class AxiosGateway implements WeatherGateway {
  async GetByCity(city: string): Promise<Weather> {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    return openWeatherMapperTest.toDomain(response);
  }
}
