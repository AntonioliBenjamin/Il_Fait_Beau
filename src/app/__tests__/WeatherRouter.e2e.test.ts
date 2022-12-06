import { MongoDbWeatherRepository } from "./../../adapters/repositories/MongoDbWeatherRepository";
import { WeatherRepository } from "./../../core/repositories/WeatherRepository";
import { Weather } from "./../../core/entities/Weather";
import { v4 } from "uuid";
import "dotenv/config";
import supertest from "supertest";
import express from "express";
import { MongoDbWeatherModel } from "./../../adapters/repositories/models/MongoDbWeather";
import mongoose from "mongoose";
import { routerWeather } from "../routes/weather";
const app = express();

describe("E2E - WeatherRouter", () => {
  let weather: Weather;
  let weatherRepository: WeatherRepository;
  let result: Weather;

  beforeAll(async () => {
    app.use(express.json());
    app.use("/weather", routerWeather);

    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
    weather = Weather.create({
      city: "paris",
      humidity: 0.99,
      lat: 48.85341,
      lon: 2.3488,
      tempInCelcius: 11,
      windSpeed: 150,
    });
    weatherRepository = new MongoDbWeatherRepository();
  });
  beforeEach(async () => {
    result = await weatherRepository.save(weather);
  });
  afterEach(async () => {
    await MongoDbWeatherModel.collection.drop();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should get /weather/city/:city", async () => {
    await supertest(app)
      .get(`/weather/city/${result.props.city}`)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.humidity).toEqual(0.99);
      })
      .expect(200);
  });
  it("should get /weather/city/:lat/:lon", async () => {
    await supertest(app)
      .get(`/weather/coordinate/${result.props.lat}/${result.props.lon}`)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.humidity).toEqual(0.99);
      })
      .expect(200);
  });

  it("should delete all weathers", async () => {
    await weatherRepository.deleteAll();
    await supertest(app).delete("/weather").expect(200);
  });
});
