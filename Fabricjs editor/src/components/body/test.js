const groupItem = () => {
  var element = [];
  canvas.forEachObject(function (obj) {
    console.log("Object type > ", obj);
    element.push(obj);
  });
  var group = new fabric.Group(element);
  canvas.clear();
  canvas.add(group);
  canvas.renderAll();
  setGroup(true);
};

const unGroupItem = () => {
  if (group) {
    canvas.setActiveObject(canvas.item(0));
    var objectList = []; //CREATE A TEMP ARRAY TO KEEP THE CLONED OBJECTS
    let x = canvas.getActiveObject()._objects;
    for (var i = 0; i < x.length; i++) {
      objectList[i] = fabric.util.object.clone(x[i]);
      objectList[i].set("top", objectList[i].originalTop); //SET THE ORIGINAL TOP VALUE, BECAUSE NOW IT IS NEGATIVE
      objectList[i].set("left", objectList[i].originalLeft); //SET THE ORIGINAL LEFT VALUE, BECAUSE NOW IT IS NEGATIVE
      objectList[i].set({
        objectId: Date.now(), //CUSTOM PROPERTY
        typeTable: "cloneGroup", //CUSTOM PROPERTY
        selectable: true,
      });

      objectList[i].setCoords(); //CALL THE setCoords() TO GET THE CORRECT CORNER COORDS
    }
    //ADD THE CLONED OBJECTS ON CANVAS
    canvas.clear();
    for (var i = 0; i < objectList.length; i++) {
      objectList[i].set({
        hasControls: true,
        selectable: true,
        hasBorders: true,
      });
      canvas.add(objectList[i]);
    }
    canvas.renderAll();

    // //SAVE THE CANVAS ON A TEMP VAR
    // var tempCanvasToJSON = JSON.stringify(canvas);
    // canvas.clear(); //CLEAR CANVAS
    // //LOAD THE SAVED CANVAS TO SHOW THE OBJECTS ON THE RIGHT POSITIONS
    // canvas.loadFromJSON(tempCanvasToJSON, function () {
    //   canvas.renderAll();
    // });

    // tempCanvasToJSON = null; //DESTROY OBJECT
  }
  var items = canvas.getObjects;
  console.log("Selected items are from group > ", items);
};
