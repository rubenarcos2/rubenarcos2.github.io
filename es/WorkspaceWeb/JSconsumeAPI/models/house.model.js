/**
 * @class Model
 *
 * Manages the data of the application.
 */

 class House {
    constructor(shortDescription, longDescription, phone, photo) {
      this.shortDescription = shortDescription;
      this.longDescription = longDescription;
      this.phone = phone;
      this.photo = photo;
    }

    getPhoto(){
      return window.URL + "/" + this.photo;
    }
  }