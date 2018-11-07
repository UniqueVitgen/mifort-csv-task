export class ErrorObject {
  public message: string = "";
  invalid: boolean = true;
  property: string = "";

  constructor(message: string, property: string) {
    this.message = message;
    this.property = property;
  }
}