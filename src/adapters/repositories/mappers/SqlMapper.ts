import { Weather } from "../../../core/entities/Weather";
import { WeatherSqlModel } from "../models/SqlWeather";
import { Mapper } from "./mapper";

export class SqlMapper implements Mapper<Weather, WeatherSqlModel> {
  toDomain(raw: WeatherSqlModel): Weather {
    return new Weather({
      city: raw.city,
      tempInCelcius: raw.tempInCelcius,
      windSpeed: raw.windSpeed,
      lat: raw.lat,
      lon: raw.lon,
      humidity: raw.humidity,
      createdAt: new Date(raw.createdAt),
    });
  }

  fromDomain(data: Weather): WeatherSqlModel {
    return new WeatherSqlModel({
      city: data.props.city,
      tempInCelcius: +data.props.tempInCelcius.toFixed(2),
      windSpeed: +data.props.windSpeed.toFixed(2),
      lat: +data.props.lat.toFixed(2),
      lon: +data.props.lon.toFixed(2),
      humidity: +data.props.humidity.toFixed(2),
      createdAt: +data.props.createdAt,
    });
  }
}
