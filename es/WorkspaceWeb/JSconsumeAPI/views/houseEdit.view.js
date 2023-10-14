/**
 * @class View
 *
 * Visual representation of the model.
 */
 class HouseEditView {

    constructor() {
      this.app = document.getElementsByClassName('container');
    }

    show(house){
      this.app[0].innerHTML = "";
      
      this.form = document.createElement("form");
      this.form.id = "form_data";
      this.form.className = "form-group";
      this.form.method = 'POST';

      this.labelID = document.createElement("label");
      this.labelID.textContent = "ID";
      this.inputID = document.createElement("input");
      this.inputID.name = "id";
      this.inputID.value = house.id;
      this.inputID.readOnly = true;
      this.inputID.className = "form-control";

      this.labelShortDescription = document.createElement("label");
      this.labelShortDescription.textContent = "Título";
      this.inputShortDescription = document.createElement("input");
      this.inputShortDescription.name = "shortDescription";
      this.inputShortDescription.value = house.shortDescription;
      this.inputShortDescription.className = "form-control";

      this.labelLongDescription = document.createElement("label");
      this.labelLongDescription.textContent = "Descripción";
      this.inputLongDescription = document.createElement("input");
      this.inputLongDescription.name = "longDescription";
      this.inputLongDescription.value = house.longDescription;
      this.inputLongDescription.className = "form-control";
      
      this.labelPhone = document.createElement("label");
      this.labelPhone.textContent = "Teléfono";
      this.inputPhone = document.createElement("input");
      this.inputPhone.name = "phone";
      this.inputPhone.value = house.phone;
      this.inputPhone.className = "form-control";

      this.labelPhoto = document.createElement("label");
      this.labelPhoto.textContent = "Fotografía";
      this.inputPhoto = document.createElement("input");
      this.inputPhoto.name = "photo";
      this.inputPhoto.value = house.photo;
      this.inputPhoto.className = "form-control";

      
      this.labelProperty = document.createElement("label");
      this.labelProperty.textContent = "Propietario";
      this.inputProperty = document.createElement("input");
      this.inputProperty.name = "property";
      this.inputProperty.value = house.property;
      this.inputProperty.className = "form-control";

      this.btnSubmit = document.createElement("button");
      this.btnSubmit.id = "btnSave";
      this.btnSubmit.type = "submit";
      this.btnSubmit.className = "btn btn-primary";
      this.btnSubmit.textContent = "Enviar";

      this.form.appendChild(this.labelID);
      this.form.appendChild(this.inputID);
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

      this.btnDelete = document.createElement("a");
      this.btnDelete.id = "btnDelete";
      this.btnDelete.className = "btn btn-danger";
      this.btnDelete.textContent = "Eliminar";
      this.app[0].appendChild(this.btnDelete);
    }
    
    bindBtnSave = async (handler, id) => {
      document.getElementById('btnSave').addEventListener('click', event => {
          event.preventDefault();
          console.log(event.target.form);
          handler(id, event.target.form);
      });      
    }

    bindBtnDelete = (handler, id) => {
      document.getElementById('btnDelete').addEventListener('click', event => {
        handler(id);
      });    
    }
    
  }