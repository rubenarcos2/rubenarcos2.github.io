/**
 * @class View
 *
 * Visual representation of the model.
 */
 class HouseView {

    constructor() {
      this.app = document.getElementsByClassName('#root')[0];      
      this.toogleLoading(true);
      //this.addRow(new House('shortDescription', "longDescription", "952123456", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80"));
    }

    toogleLoading(loading){
      loading ? document.getElementById('loading').style = 'display: block' : document.getElementById('loading').style = 'display:none';
    }

    showTable(hidden){
      this.table = document.getElementsByTagName('table');

      if(this.table.length == 0){
        this.titleTableHouses = document.createElement('h1');
        this.titleTableHouses.textContent = "Listado de viviendas"
        hidden ? this.table.style = "display: none": this.table.style = "display: block";
        this.tableHouses = document.createElement('table');
        this.tableHouses.className = "table align-middle";
        this.tableHousesThPhoto = document.createElement('th');
        this.tableHousesThPhoto.textContent = "Imágen";
        this.tableHouses.appendChild(this.tableHousesThPhoto);
        this.tableHousesThShortDescription = document.createElement('th');
        this.tableHousesThShortDescription.textContent = "Vivienda";
        this.tableHouses.appendChild(this.tableHousesThShortDescription);
        this.tableHousesThShortDescription = document.createElement('th');
        this.tableHousesThShortDescription.textContent = "Vivienda";
        this.tableHouses.appendChild(this.tableHousesThShortDescription);
        this.tableHousesThPhone = document.createElement('th');
        this.tableHousesThPhone.textContent = "Teléfono";
        this.tableHouses.appendChild(this.tableHousesThPhone);
        // this.tableHousesThOperations = document.createElement('th');
        // this.tableHousesThOperations.textContent = "Operaciones";
        // this.tableHouses.appendChild(this.tableHousesThOperations);
        this.container = document.getElementsByClassName('container')[0];
              
        this.btnNew = document.createElement("a");
        this.btnNew.className = "btn btn-secondary m-3";
        this.btnNew.textContent = "Nueva vivienda";
        this.btnNew.id = "btnNew";
        this.container.appendChild(this.titleTableHouses);
        this.container.appendChild(this.btnNew);
        this.container.appendChild(this.tableHouses);
      }    
    }

    addRow(house){
      
      this.table = document.getElementsByTagName('table');
      this.houseRow = this.table.item(this.table.item.row);
      this.row = this.houseRow.insertRow(-1);
      this.row.id = house.id;

      this.id = this.row.insertCell(-1);
      this.idContent = document.createTextNode(house.id);
      this.id.style.display = "none";
      this.id.appendChild(this.idContent);

      this.photo = this.row.insertCell(-1);
      this.photoContent = document.createElement("img");
      house.photo == undefined ? this.photoContent.src = "./assets/images/no-image.jpg" : this.photoContent.src = house.photo;
      this.photoContent.width = 100;
      this.photoContent.height = 100;
      this.photo.appendChild(this.photoContent);
      
      this.shortDescription = this.row.insertCell(-1);
      this.shortDescriptionContent = document.createTextNode(house.shortDescription);
      this.shortDescription.appendChild(this.shortDescriptionContent);
      
      this.longDescription = this.row.insertCell(-1);
      this.longDescriptionContent = document.createTextNode(house.longDescription);
      this.longDescription.appendChild(this.longDescriptionContent);
      
      this.phone = this.row.insertCell(-1);
      this.phoneContent = document.createTextNode(house.phone);
      this.phone.appendChild(this.phoneContent);

      // this.operations = this.row.insertCell(-1);
      // this.btnEdit = document.createElement("a");
      // this.btnEdit.className = "btn btn-primary";
      // this.btnEdit.text = "Editar";
      // this.btnEdit.id = "btnEdit-" + house.id;
      // this.operations.appendChild(this.btnEdit);
    }

    bindRowShow = (handler, id) => {
      document.getElementById(id).addEventListener('click', event => {
          handler(id);
      });      
    }
    
    bindBtnNew = (handler) => {
      document.getElementById('btnNew').addEventListener('click', event => {
          handler(event.target);
      });      
    }
}