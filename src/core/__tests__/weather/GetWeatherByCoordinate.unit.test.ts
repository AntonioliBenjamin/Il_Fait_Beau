import { GetWeatherByCoordinate } from "./../../usecases/GetWeatherByCoordinate";
import "dotenv/config";
import { AxiosGateway } from "../adapters/gateways/AxiosGateway";
import { InMemoryWeatherRepository } from "../adapters/repositories/InMemoryWeatherRepository";

import { Weather } from "../../entities/Weather";
const axiosGateway = new AxiosGateway();
const db = new Map<string, Weather>();
const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);

describe("Unit - GetWeatherByCoordinate", () => {
  let weather: Weather;
  let getWeatherByCoordinate: GetWeatherByCoordinate;

  beforeAll(() => {
    getWeatherByCoordinate = new GetWeatherByCoordinate(
      inMemoryWeatherRepository,
      axiosGateway
    );
    weather = new Weather({
      city: "paris",
      humidity: 0.99,
      temp_c: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 9999,
      lon: 1111,
    });
    db.set(weather.props.city, weather);
  });
  it("should get weather by coordinate from db", async () => {
    const result = await getWeatherByCoordinate.execute({
      lat: 9999,
      lon: 1111,
    });
    expect(result.props.city).toEqual("paris");
  });

  it("should get weather by coordinate from OpenWeatherAPI", async () => {
    const result = await getWeatherByCoordinate.execute({
      lat: 40.7143,
      lon: -74.006,
    });
    console.log(result)
    expect(result.props.city).toEqual("new york");
  });
});

