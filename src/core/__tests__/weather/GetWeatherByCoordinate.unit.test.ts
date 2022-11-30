import { GetWeatherByCoordinate } from "./../../usecases/GetWeatherByCoordinate";
import "dotenv/config";
import { InMemoryWeatherGateway } from "../adapters/gateways/InMemoryWeatherGateway";
import { InMemoryWeatherRepository } from "../adapters/repositories/InMemoryWeatherRepository";
import { Weather } from "../../entities/Weather";
const weatherDb = new Map<string, Weather>();
const axiosGateway = new InMemoryWeatherGateway(weatherDb);
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
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 9999,
      lon: 1111,
    });
    weatherDb.set(
      "tokyo",
      new Weather({
        city: "tokyo",
        humidity: 0.99,
        tempInCelcius: 264,
        windSpeed: 150,
        createdAt: new Date(),
        lat: 2222,
        lon: 1111,
      })
    );
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
      lat: 2222,
      lon: 1111,
    });
    expect(result.props.city).toEqual("tokyo");
  });
});

