import { CityErrors } from "../Errors/CityErrors";
const cities = require("cities.json");

export class City {
  city: string;

  constructor(city: string) {
    this.city = city.trim().toLowerCase();
    if (!this.isValid()) {
      throw new CityErrors.InvalidEntry();
    }
  }

  isValid(): boolean {
    const regex = new RegExp(/^[A-Za-z\s]*$/);
    return regex.test(this.city);
  }

  exist(): string {
    const city = cities.find((elm) => elm.name.toLowerCase() === this.city.toLowerCase());
    if (!city) {
      throw new CityErrors.NotFound();
    }
    return city.name.toLowerCase();
  }
}
