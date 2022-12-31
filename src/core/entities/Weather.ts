import { Coordinates } from "./../valueObjects/Coordinates";
import { City } from "./../valueObjects/City";

export type WeatherProperties = {
  city: string;
  tempInCelcius: number;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
  createdAt: Date;
};

export class Weather {
  props: WeatherProperties;

  constructor(props: WeatherProperties) {
    this.props = props;
    new Coordinates({
      lat: this.props.lat,
      lon: this.props.lon,
    })//.exist();
  }

  static create(props: {
    city: string;
    tempInCelcius: number;
    humidity: number;
    windSpeed: number;
    lat: number;
    lon: number;
  }) {
    return new Weather({
      city: new City(props.city.toLowerCase().trim()).exist(),
      tempInCelcius: props.tempInCelcius,
      humidity: props.humidity,
      windSpeed: props.windSpeed,
      lat: props.lat,
      lon: props.lon,
      createdAt: new Date(),
    });
  }
}
