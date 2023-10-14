/**
 * @class Controller
 *
 * Links the House input and the view output.
 *
 * @param model
 * @param view
 */
 class HouseController {
    constructor(HouseService, HouseView, HouseEditView, HouseNewView) {
      this.HouseService = HouseService;
      this.HouseView = HouseView;
      this.HouseEditView = HouseEditView;
      this.HouseNewView = HouseNewView;

      // Display initial Houses
      //this.house = new House('shortDescription', "longDescription", "952123456", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80")
      //this.house.id = 1;
      //this.HouseView.addRow(this.house);
      this.showOnInit();

      // Explicit this binding
      // this.HouseService.bindHouseListChanged(this.onHouseListChanged);
      // this.HouseView.bindAddHouse(this.handleAddHouse);
      //this.HouseEditView.bindBtnsEdit(this.handleEditHouse);
      //this.HouseEditView.bindBtnsDelete(this.handleDeleteHouse);
      // this.HouseView.bindToggleHouse(this.handleToggleHouse);
    }

    showOnInit = async () => {    
      this.HouseService.getAll()
      .then(e => e.forEach(elm => {
        this.HouseView.showTable(true);
        this.HouseView.bindBtnNew(this.handleNewHouse);
        this.HouseView.addRow(elm);  
        this.HouseView.toogleLoading(false)
        this.HouseView.bindRowShow(this.onHouseListClicked, elm.id)
      }))
      .catch(this.HouseView.toogleLoading(true))
    }
  
    onHouseListClicked = id => {
      console.log("Click on item -> Edit view ", id);
      this.HouseService.getById(id)
      .then(e => {
        this.HouseEditView.show(e);
        this.HouseEditView.bindBtnSave(this.handleSaveEditHouse, e.id);
        this.HouseEditView.bindBtnDelete(this.handleDeleteHouse, e.id);     
      });
    };
  
    handleNewHouse = () => {
      console.log("Click on item -> New view");
      this.HouseNewView.show();
      this.HouseNewView.bindBtnNew(this.handleAddHouse);
    };

    handleAddHouse = House => {
      console.log("Click on item -> Save New view");
      this.HouseService.add(House);
      alert("La vivienda se ha creado correctamente");
      window.location.reload();
    };
  
    handleSaveEditHouse = (id, form) => {
      console.log("Click on item -> Save view");
      this.HouseService.edit(id, form);
      alert("La vivienda se ha modificado correctamente");
      window.location.reload();
    };
  
    handleDeleteHouse = id => {
      console.log("Click on item -> Delete view");
      this.HouseService.delete(id);
      alert("La vivienda se ha eliminado correctamente");
      window.location.reload();
    };
  }