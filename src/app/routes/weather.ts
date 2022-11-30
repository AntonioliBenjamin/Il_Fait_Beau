import { OpenWeatherGateway } from "./../../adapters/gateways/OpenWeatherGateway";
import { MongoDbWeatherRepository } from "./../../adapters/repositories/MongoDbWeatherRepository";
import { DeleteAllWeather } from "./../../core/usecases/DeleteAllWeather";
import { GetWeatherByCoordinate } from "./../../core/usecases/GetWeatherByCoordinate";
import { GetWeatherByCity } from "./../../core/usecases/GetWeatherByCity";
import * as express from "express";
const router = express.Router();
const mongoDbWeatherRepository = new MongoDbWeatherRepository();
const openWeatherGateway = new OpenWeatherGateway();
const getWeatherByCity = new GetWeatherByCity(
  mongoDbWeatherRepository,
  openWeatherGateway
);
const getWeatherByCoordinate = new GetWeatherByCoordinate(
  mongoDbWeatherRepository,
  openWeatherGateway
);
const deleteAllWeather = new DeleteAllWeather(mongoDbWeatherRepository);

router.get("/city/:city", async (req, res) => {
  const city = req.params.city;
  const weather = await getWeatherByCity.execute(city);
  return res.status(200).send(weather.props);
});

router.get("/coordinate/:lat/:lon", async (req, res) => {
  const coordinate = {
    lat: +req.params.lat,
    lon: +req.params.lon,
  };
  const weather = await getWeatherByCoordinate.execute(coordinate);
  return res.status(200).send(weather.props);
});

router.delete("/", (req, res) => {
  deleteAllWeather.execute();
  return res.sendStatus(200);
});

export { router as routerWeather };
