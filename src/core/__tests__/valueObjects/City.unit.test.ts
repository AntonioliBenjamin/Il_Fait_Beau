import { CityErrors } from "../../Errors/CityErrors";
import { City } from "../../valueObjects/City";

describe("Unit - City", () => {
  it("should be truthy", () => {
    const result = new City("Paris");
    expect(result.isValid).toBeTruthy();
  });

  it("should throw INVALID_ENTRY", () => {
    const result = () => new City("0Paris1");
    expect(() => result()).toThrow(CityErrors.InvalidEntry);
  });

  it("should return city ", () => {
    const city = () => new City("Lyon");
    const result = city().exist();  
    expect(result).toEqual("lyon");
  });

  it("should throw CITY NOT FOUND", async () => {
    const city = () => new City("fake city");
    const result = () => city().exist();
    expect(() => result()).toThrow(CityErrors.NotFound)
  });
});
