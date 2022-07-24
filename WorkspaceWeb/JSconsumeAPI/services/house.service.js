/**
 * @class Service
 *
 * Manages the data of the application.
 */
class HouseService {
  constructor() {
    this.api_url = "https://spring-boot-api-inmobiliaria.herokuapp.com/houses";
  }

  getAll = async () => {
    const response = await fetch(this.api_url);
    const data = await response.json();
    let stringified = JSON.stringify(data);
    let parsedObj = JSON.parse(stringified);
    return parsedObj;
  };

  getById = async (id) => {
    const response = await fetch(this.api_url + "/" + id);
    const data = await response.json();
    let stringified = JSON.stringify(data);
    let parsedObj = JSON.parse(stringified);
    return parsedObj;
  };

  add = async (House) => {
    console.log(Array.from(new FormData(House)));

    let response = await fetch(this.api_url + "/new/", {
      method: "POST",
      body: new FormData(House),
    });
    let result = await response.json();
    let stringified = JSON.stringify(result);
    let parsedObj = JSON.parse(stringified);
    return parsedObj;
  };

  edit = async (id, form) => {
    console.log(Array.from(new FormData(form)));

    let response = await fetch(this.api_url + "/edit/" + id, {
      method: "POST",
      body: new FormData(form),
    });
    let result = await response.json();
    let stringified = JSON.stringify(result);
    let parsedObj = JSON.parse(stringified);
    return parsedObj;
  };

  delete = async (id) => {
    await fetch(this.api_url + "/delete/" + id, {
      method: "DELETE",
    });
  };
}
