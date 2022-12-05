import { CoordinatesErrors } from "../Errors/CoordinatesErrors";

const cities = require("cities.json");

export type coordinatesProperties = {
  lat: string;
  lon: string;
};

export class Coordinates {
  coordinates: coordinatesProperties;
  constructor(coordinates: coordinatesProperties) {
    this.coordinates = coordinates;
    if (!this.isValid()) {
      throw new CoordinatesErrors.InvalidEntry;
    }
  }

  isValid(): boolean {
    const regex = new RegExp(/^[0-9]*\.?[0-9]*$/);
    return regex.test(this.coordinates.lon) &&
            regex.test(this.coordinates.lat)  
  }

  exist() {
    const city = cities.find(
      (elm) =>
        elm.lat === this.coordinates.lat && elm.lng === this.coordinates.lon
    );
    if (!city) {
      throw new CoordinatesErrors.NotFound;
    }
    return city.name.toLowerCase();
  }
}
