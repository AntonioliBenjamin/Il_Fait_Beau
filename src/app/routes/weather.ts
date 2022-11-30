import { OpenWeatherGateway } from "./../../adapters/gateways/OpenWeatherGateway";
import { MongoDbWeatherRepository } from "./../../adapters/repositories/MongoDbWeatherRepository";
import { DeleteAllWeather } from "./../../core/usecases/DeleteAllWeather";
import { GetWeatherByCoordinate } from "./../../core/usecases/GetWeatherByCoordinate";
import { GetWeatherByCity } from "./../../core/usecases/GetWeatherByCity";
import * as express from "express";
const router = express.Router();
const mongoDbWeatherRepository = new MongoDbWeatherRepository();
const openWeatherGateway = new OpenWeatherGateway();
const detWeatherByCity = new GetWeatherByCity(
  mongoDbWeatherRepository,
  openWeatherGateway
);
const detWeatherByCoordinate = new GetWeatherByCoordinate(
  mongoDbWeatherRepository,
  openWeatherGateway
);
const deleteAllWeather = new DeleteAllWeather(mongoDbWeatherRepository);

router.get("/city/:city", (req, res) => {

})

router.get("/coordinate/:coordinate", (req, res) => {

})

router.delete("/", (req, res) => {

})

export {router as routerWeather} 