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
      lat: 48.85341,
      lon: 2.3488,
    });
    weatherDb.set(
      "tokyo",
      new Weather({
        city: "tokyo",
        humidity: 0.99,
        tempInCelcius: 264,
        windSpeed: 150,
        createdAt: new Date(),
        lat: 35.6895,
        lon: 139.69171,
      })
    );
    db.set(weather.props.city, weather);
  });
  it("should get weather by coordinate from db", async () => {
    const result = await getWeatherByCoordinate.execute({
      lat: 48.85341,
      lon: 2.3488,
    });
    expect(result.props.city).toEqual("paris");
  });

  it("should get weather by coordinate from gateway", async () => {
    const result = await getWeatherByCoordinate.execute({
      lat: 35.6895,
      lon: 139.69171,
    });
    expect(result.props.city).toEqual("tokyo");
  });
});

