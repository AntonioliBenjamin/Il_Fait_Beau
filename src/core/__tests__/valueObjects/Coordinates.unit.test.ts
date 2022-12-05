import { CoordinatesErrors } from "../../Errors/CoordinatesErrors";
import { Coordinates } from "./../../valueObjects/Coordinates";
describe("Unit - Coordinates", () => {
  it("should be truthy", () => {
    const result = new Coordinates({
      lat: "45.74846",
      lon: "4.84671",
    });
    expect(result.isValid()).toBeTruthy;
  });

  it("should throw INVALID ENTRY", () => {
    const result = () =>
      new Coordinates({
        lat: "FALSE",
        lon: "FALSE.4555",
      });
    expect(() => result()).toThrow(CoordinatesErrors.InvalidEntry);
  });

  it("should return city name", () => {
    const coordinates = () => new Coordinates({
      lat: "45.74846",
      lon: "4.84671",
    })
    const result = coordinates().exist();
    expect(result).toEqual("lyon")
  })

  it("should throw COORDINATES NOT FOUND", () => {
    const coordinates = () => new Coordinates({
      lat: "111.74846",
      lon: "111.84671",
    })
    const result = () => coordinates().exist();
    expect(() => result()).toThrow(CoordinatesErrors.NotFound)
  })
});
