import { model, Schema } from "mongoose";

export type MongoDbWeatherSchemaProperties = {
    city: string;
    temp_c: number;
    humidity: number;
    windSpeed: number;
};

const MongoDbWeatherSchema = new Schema({
 city: {
    type: String,
    required: true,
 },
 temp_c: {
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
});

export const MongoDbWeatherModel = model("Weather", MongoDbWeatherSchema);