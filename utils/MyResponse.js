//My custom response that i used to send message as string, error as array and data as an object
export class MyResponse {
  constructor() {
    this.status="",
    this.message = "";
    this.error = [];
    this.data = {};
  }
  //method used to set status
  setStatus(status){
    this.status=status;
  }
  //method used to set message
  setMessage(message) {
    if (message !== "") {
      this.message = message;
    } else {
      return "Invalid Message";
    }
  }
  //method used to push errors to an array
  pushError(error) {
    if (error.details) {
      error?.details?.forEach((element) => {
        this.error.push(element.message);
      });
    } else {
      this.error.push(error);
    }
  }
  //method used to set the data to the object
  setData(data) {
    this.data = data;
  }
}
