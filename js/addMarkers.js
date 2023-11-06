AFRAME.registerComponent("create-markers", {
  
  init: async function() {

    var mainScene = document.querySelector("#main-scene");

    //get the toys collection from firestore database
    var toys = await this.getAllToys();
   
    toys.map(toy => {
      var marker = document.createElement("a-marker");   
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", toy.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });

      //set the markerhandler component
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // Adding 3D model to scene
      var model = document.createElement("a-entity");    
     
      model.setAttribute("id", `model-${dish.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${toy.model_url})`);
      model.setAttribute("gesture-handler", {});
      marker.appendChild(model);

      //toy title background plane 
      var titlePlane = document.createElement("a-plane"); 
      titlePlane.setAttribute("id", `title-plane-${toy.id}`); 
      titlePlane.setAttribute("position", { x: 0, y: 1.1, z: 0.1 }); 
      titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 }); 
      titlePlane.setAttribute("width", 2.31); 
      titlePlane.setAttribute("height", 0.4); 
      titlePlane.setAttribute("material", { color: "#f14668" }); 
      mainPlane.appendChild(titlePlane);

      //age
      age var age = document.createElement("a-entity"); 
      age.setAttribute("id", `age-${toy.id}`); 
      age.setAttribute("position", { x: -0.75, y: -0.8, z: 0.1 }); 
      age.setAttribute("rotation", { x: 0, y: 0, z: 0 }); 
      age.setAttribute("text", { font: "aileronsemibold", color: "#290149", width: 2, height: 5, align: "center", value: `AGE : ${toy.age_group}` }); 
      mainPlane.appendChild(age);

      // Toy title
      var toyTitle = document.createElement("a-entity");
      toyTitle.setAttribute("id", `toy-title-${toy.id}`);
      toyTitleTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
      toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      toyTitle.setAttribute("text", {
        font: "monoid",
        color: "black",
        width: 1.8,
        height: 1,
        align: "center",
        value: dish.dish_name.toUpperCase()
      });
      titlePlane.appendChild(dishTitle);

      // Ingredients List
      var ingredients = document.createElement("a-entity");
      description.setAttribute("id", `description-${toy.id}`);
      description.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
      description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      description.setAttribute("text", {
        font: "monoid",
        color: "black",
        width: 2,
        align: "left",
        value: `${toy.ingredients.join("\n\n")}`
      });
      mainPlane.appendChild(description);
    });
  },
  //function to get the dishes collection from firestore database
  getAllToys: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
