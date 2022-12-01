import { OpenWeatherGateway } from "./../gateways/OpenWeatherGateway";
import nock from "nock";
const openWeatherGateway = new OpenWeatherGateway();

describe("Integration - OpenWeatherGateway", () => {
  let API_KEY: string;
  let lat = 48.8534;
  let lon = 2.3488;
  let city: string;
  let parisMock;

  beforeAll(() => {
    parisMock = {
      coord: {
        lon: 2.3488,
        lat: 48.8534,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      base: "stations",
      main: {
        temp: 281.16,
        feels_like: 281.16,
        temp_min: 279.58,
        temp_max: 281.92,
        pressure: 1019,
        humidity: 91,
      },
      visibility: 9000,
      wind: {
        speed: 1.03,
        deg: 0,
      },
      clouds: {
        all: 100,
      },
      dt: 1669725547,
      sys: {
        type: 2,
        id: 2012208,
        country: "FR",
        sunrise: 1669706400,
        sunset: 1669737487,
      },
      timezone: 3600,
      id: 2988507,
      name: "Paris",
      cod: 200,
    };
    city = "paris";
  });

  it("should get weather by coordonate", async () => {
    nock("https://api.openweathermap.org")
      .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .reply(200, parisMock);

    const result = await openWeatherGateway.getWeatherByCoordinate(lon, lat);
    expect(result.props.tempInCelcius).toEqual(parisMock.main.temp - 273);
  });

  it("should get weather by city", async () => {
    nock("https://api.openweathermap.org")
      .get(
        `/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .reply(200, parisMock);

    const result = await openWeatherGateway.getByCity(city);
    expect(result.props.tempInCelcius).toEqual(parisMock.main.temp - 273);
  });
});