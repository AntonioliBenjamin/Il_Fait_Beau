export type WeatherProperties = {
  city: string;
  temp_c: number;
  humidity: number;
  windSpeed: number;
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
  }) {
    return new Weather({
      city: props.city,
      temp_c: props.temp_c,
      humidity: props.humidity,
      windSpeed: props.windSpeed,
    });
  }
}
