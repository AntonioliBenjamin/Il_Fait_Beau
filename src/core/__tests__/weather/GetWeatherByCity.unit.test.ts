import { weatherFixtures } from './../../fixtures/weatherFixtures';
import "dotenv/config";
import { InMemoryWeatherGateway } from "../adapters/gateways/InMemoryWeatherGateway";
import { InMemoryWeatherRepository } from "../adapters/repositories/InMemoryWeatherRepository";
import { GetWeatherByCity } from "../../usecases/GetWeatherByCity";
import { Weather } from "../../entities/Weather";
const weatherDb = new Map<string, Weather>();
const db = new Map<string, Weather>();
const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);
const axiosGateway = new InMemoryWeatherGateway(weatherDb);

describe("Unit - GetWeatherByCity", () => {
  let weather: Weather 
  let getWeatherByCity: GetWeatherByCity;

  beforeAll(() => {
    getWeatherByCity = new GetWeatherByCity(
      inMemoryWeatherRepository,
      axiosGateway
    );
    weather = weatherFixtures[0];
    weatherDb.set(
      "tokyo",
      new Weather({
        city: "tokyo",
        humidity: 0.99,
        tempInCelcius: 264,
        windSpeed: 150,
        createdAt: new Date(),
        lat: 9999,
        lon: 1111,
      })
    );
    db.set(weather.props.city, weather);
  });
  it("should get already saved weather ", async () => {
    const result = await getWeatherByCity.execute("paris");
    expect(result.props.humidity).toEqual(0.99);
  });

  it("should get and save weather", async () => {
    const result = await getWeatherByCity.execute("tokyo");
    expect(result.props.humidity).toBeGreaterThan(0);
    expect(result.props.tempInCelcius).toBeDefined();
    expect(result.props.city).toEqual("tokyo");
  });
});
