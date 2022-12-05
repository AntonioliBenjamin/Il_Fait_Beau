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
    this.props.city = new City(props.city).exist();
    new Coordinates({
      lat: this.props.lat,
      lon: this.props.lon,
    }).exist();
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
      city: props.city.toLowerCase().trim(),
      tempInCelcius: props.tempInCelcius,
      humidity: props.humidity,
      windSpeed: props.windSpeed,
      lat: props.lat,
      lon: props.lon,
      createdAt: new Date(),
    });
  }
}
