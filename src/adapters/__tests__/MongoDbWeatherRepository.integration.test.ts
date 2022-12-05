import { weatherFixtures } from './../../core/fixtures/weatherFixtures';
import { MongoDbWeatherModel } from './../repositories/models/MongoDbWeather';
import { Weather } from "./../../core/entities/Weather";
import { MongoDbWeatherRepository } from "./../repositories/MongoDbWeatherRepository";
import mongoose from "mongoose";
import { v4 } from "uuid";

describe("Integration - MongoDbWeatherRepository", () => {
  let weather: Weather;
  const mongoDbWeatherRepository = new MongoDbWeatherRepository();

  beforeAll(async () => {
    const databaseId = v4();
    mongoose.connect(`mongodb://localhost:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    }); 

    
    weather = weatherFixtures[1]
    
  });

  beforeEach(async () => {

   await mongoDbWeatherRepository.save(weather);
  })

  afterEach(async () => {
    await MongoDbWeatherModel.collection.drop();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should save weather",async () => {
   const result = await mongoDbWeatherRepository.save(weather)
   expect(result.props.city).toEqual("marseille")
  });

  it("should get weather by city", async () => {
    const result = await mongoDbWeatherRepository.getByCity("marseille");
    expect(result.props.lat).toEqual(43.29695)
  })

  it("should get weather by coordinate", async () => {
    const result = await mongoDbWeatherRepository.getByCoordinate(43.29695, 5.38107);
    expect(result.props.lat).toEqual(43.29695)
  })

  it("should delete all weathers", async () => {
    await mongoDbWeatherRepository.deleteAll()
    const result = await mongoDbWeatherRepository.getByCity("marseille");
    expect(result).toEqual(null)
  })
});
