import { model, Schema } from "mongoose";

export type MongoDbWeatherSchemaProperties = {
  city: string;
  tempInCelcius: number;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
  createdAt: number;
};

const MongoDbWeatherSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  tempInCelcius: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

export const MongoDbWeatherModel = model("Weather", MongoDbWeatherSchema);
