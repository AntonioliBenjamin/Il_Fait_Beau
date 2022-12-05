import { CoordinatesErrors } from "../Errors/CoordinatesErrors";
const cities = require("cities.json");

export type coordinatesProperties = {
  lat: number;
  lon: number;
};

export class Coordinates {
  coordinates: coordinatesProperties;
  constructor(coordinates: coordinatesProperties) {
    this.coordinates = coordinates;
    if (!this.isValid()) {
      throw new CoordinatesErrors.InvalidEntry();
    }
  }

  isValid(): boolean {
    const regex = new RegExp(/^[0-9]*\.?[0-9]*$/);
    return (
      regex.test(this.coordinates.lon.toString()) &&
      regex.test(this.coordinates.lat.toString())
    );
  }

  exist() {
    const city = cities.find(
      (elm) =>
        elm.lat === this.coordinates.lat.toString() &&
        elm.lng === this.coordinates.lon.toString()
    );
    if (!city) {
      throw new CoordinatesErrors.NotFound();
    }
    return city.name.toLowerCase();
  }
}
