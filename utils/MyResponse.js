export class MyResponse {
  constructor() {
    this.message = "";
    this.error = [];
    this.data = {};
  }
  setMessage(message) {
    if (message !== "") {
      this.message = message;
    } else {
      return "Invalid Message";
    }
  }
  pushError(error) {
    if (error.details) {
      error?.details?.forEach((element) => {
        this.error.push(element.message);
      });
    } else {
      this.error.push(error);
    }
  }
  setData(data) {
    this.data = data;
  }
}
