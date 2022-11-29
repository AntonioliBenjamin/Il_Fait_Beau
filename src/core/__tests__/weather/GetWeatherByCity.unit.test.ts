import "dotenv/config";
import { AxiosGateway } from "../adapters/gateways/AxiosGateway";
import { InMemoryWeatherRepository } from "../adapters/repositories/InMemoryWeatherRepository";
import { GetWeatherByCity } from "../../usecases/GetWeatherByCity";
import { Weather } from "../../entities/Weather";
const axiosGateway = new AxiosGateway();
const db = new Map<string, Weather>();
const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);

describe("Unit - GetWeatherByCity", () => {
  let weather: Weather;
  let getWeatherByCity: GetWeatherByCity;

  beforeAll(() => {
    getWeatherByCity = new GetWeatherByCity(
      inMemoryWeatherRepository,
      axiosGateway
    );
    weather = new Weather({
      city: "paris",
      humidity: 0.99,
      temp_c: 264,
      windSpeed: 150,
    });
    db.set(weather.props.city, weather);
  });
  it("should get weather by city from map", async () => {
    const result = await getWeatherByCity.execute("paris");
    expect(result.props.humidity).toEqual(0.99);
  });

  it("should get weather by city from Open Weather API", async () => {
    const result = await getWeatherByCity.execute("tokyo");
    expect(result.props.humidity).toBeGreaterThan(0);
    expect(result.props.temp_c).toBeDefined();
    expect(result.props.temp_c).toBeGreaterThan(0);
    expect(result.props.city).toEqual("tokyo");
  });
});
