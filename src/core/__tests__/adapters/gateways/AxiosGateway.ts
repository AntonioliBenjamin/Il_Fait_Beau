import { OpenWeatherMapperTest } from './../../mappers/OpenWeatherMapperTest';
import { Weather } from './../../../entities/Weather';
import { WeatherGateway } from './../../../gateways/WeatherGateway';
import axios from 'axios';
const API_KEY = process.env.API_KEY
const openWeatherMapperTest = new OpenWeatherMapperTest()


export class AxiosGateway implements WeatherGateway {
    async GetByCity(city: string): Promise<Weather> {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da9d83d047312315668331f6fbc04d5a`);
        console.log(response);
     
       return openWeatherMapperTest.toDomain(response)
      //  new Weather({
      //   city: response.data.name,
      //   humidity: response.data.humidity,
      //   temp_c: response.data.temp_c,
      //   windSpeed: response.data.wind_speed,
      // })
    }


}
