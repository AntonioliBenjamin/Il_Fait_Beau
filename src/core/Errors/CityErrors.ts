import { DomainErrors } from "./DomainErrors";

export namespace CityErrors {
  export class InvalidEntry extends DomainErrors {
    constructor() {
        super("INVALID_ENTRY")
    }
  }

  export class NotFound extends DomainErrors {
    constructor() {
      super("CITY NOT FOUND")
    }
  }
}
