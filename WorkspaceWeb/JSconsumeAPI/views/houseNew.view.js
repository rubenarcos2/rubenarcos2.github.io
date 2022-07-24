/**
 * @class View
 *
 * Visual representation of the model.
 */
 class HouseNewView {

    constructor() {
      this.app = document.getElementsByClassName('container');
    }

    show(house){
      this.app[0].innerHTML = "";
      
      this.form = document.createElement("form");
      this.form.id = "form_data";
      this.form.className = "form-group";
      this.form.method = 'POST';
      this.labelShortDescription = document.createElement("label");
      this.labelShortDescription.textContent = "Título";
      this.inputShortDescription = document.createElement("input");
      this.inputShortDescription.name = "shortDescription";
      this.inputShortDescription.className = "form-control";

      this.labelLongDescription = document.createElement("label");
      this.labelLongDescription.textContent = "Descripción";
      this.inputLongDescription = document.createElement("input");
      this.inputLongDescription.name = "longDescription";
      this.inputLongDescription.className = "form-control";
      
      this.labelPhone = document.createElement("label");
      this.labelPhone.textContent = "Teléfono";
      this.inputPhone = document.createElement("input");
      this.inputPhone.name = "phone";
      this.inputPhone.className = "form-control";

      this.labelPhoto = document.createElement("label");
      this.labelPhoto.textContent = "Fotografía";
      this.inputPhoto = document.createElement("input");
      this.inputPhoto.name = "photo";
      this.inputPhoto.className = "form-control";

      
      this.labelProperty = document.createElement("label");
      this.labelProperty.textContent = "Propietario";
      this.inputProperty = document.createElement("input");
      this.inputProperty.name = "property";
      this.inputProperty.className = "form-control";

      this.btnSubmit = document.createElement("button");
      this.btnSubmit.id = "btnNew";
      this.btnSubmit.type = "submit";
      this.btnSubmit.className = "btn btn-primary";
      this.btnSubmit.textContent = "Crear nueva vivienda";

      this.form.appendChild(this.labelShortDescription);
      this.form.appendChild(this.inputShortDescription);
      this.form.appendChild(this.labelLongDescription);
      this.form.appendChild(this.inputLongDescription);
      this.form.appendChild(this.labelPhone);
      this.form.appendChild(this.inputPhone);
      this.form.appendChild(this.labelPhoto);
      this.form.appendChild(this.inputPhoto);
      this.form.appendChild(this.labelProperty);
      this.form.appendChild(this.inputProperty);
      this.form.appendChild(this.btnSubmit);
      this.app[0].appendChild(this.form);
    }
    
    bindBtnNew = async (handler) => {
      document.getElementById('btnNew').addEventListener('click', event => {
          event.preventDefault();
          handler(event.target.form);
      });      
    }
    
  }