import "dotenv/config";
import { DeleteAllWeather } from "./../../usecases/DeleteAllWeather";
import { InMemoryWeatherRepository } from "../adapters/repositories/InMemoryWeatherRepository";
import { Weather } from "../../entities/Weather";
const db = new Map<string, Weather>();
const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);

describe("Unit - GetWeatherByCity", () => {
  let weather: Weather;
  let deleteAllWeather: DeleteAllWeather;

  beforeAll(() => {
    deleteAllWeather = new DeleteAllWeather(inMemoryWeatherRepository);
    weather = new Weather({
      city: "paris",
      humidity: 0.99,
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 48.85341,
      lon: 2.3488,
    });
    db.set(weather.props.city, weather);
  });
  
  it("should get weather by city from map", async () => {
    deleteAllWeather.execute();
    expect(db.get("paris")).toBeFalsy();
  });
});