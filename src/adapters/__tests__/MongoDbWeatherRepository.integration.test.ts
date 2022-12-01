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

    
    weather = weatherFixtures[2]
    
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
   expect(result.props.city).toEqual("las vegas")
  });

  it("should get weather by city", async () => {
    const result = await mongoDbWeatherRepository.getByCity("las vegas");
    expect(result.props.lat).toEqual(7777)
  })

  it("should get weather by coordinate", async () => {
    const result = await mongoDbWeatherRepository.getByCoordinate(7777, 7777);
    expect(result.props.lat).toEqual(7777)
  })

  it("should delete all weathers", async () => {
    await mongoDbWeatherRepository.deleteAll()
    const result = await mongoDbWeatherRepository.getByCity("las vegas");
    expect(result).toEqual(null)
  })
});
