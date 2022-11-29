export type WeatherProperties = {
  city: string;
  temp_c: number;
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
  }

  static create(props: {
    city: string;
    temp_c: number;
    humidity: number;
    windSpeed: number;
    lat: number;
    lon: number;
  }) {
    return new Weather({
      city: props.city.toLowerCase(),
      temp_c: props.temp_c,
      humidity: props.humidity,
      windSpeed: props.windSpeed,
      lat: props.lat,
      lon: props.lon,
      createdAt: new Date(),
    });
  }
}
