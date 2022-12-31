import { DomainErrors } from "./DomainErrors";

export namespace CoordinatesErrors {
  export class InvalidEntry extends DomainErrors {
    constructor() {
        super("INVALID_ENTRY")
    }
  }

  // export class NotFound extends DomainErrors {
  //   constructor() {
  //     super("COORDINATES NOT FOUND")
  //   }
  // }
}
