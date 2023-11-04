//refer database (firebase) --- AR MENU CARD --- NAME OF THE DATABASE
AFRAME.registerComponent("marker-handler", {
    init: async function() //async function = waiting time to run the function
    {
        var toy  = await this.getAllToys();
       //markerFound event
        this.el.addEventListener("markerFound", () => {
        var markerId = this.el.id;      
        this.handleMarkerFound(toys, markerId);
      });
  
      //markerLost event
      this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
      });
    },
    handleMarkerFound: function()
    {
        //Changingbutton div visibility
        var buttondiv = document.getElementById("button-div");
        buttondiv.style.display = "flex" //output will be displayed only if the marker is found

        var orderbutton = document.getElementById("order-button");
        var orderSummaryButton = document.getElementById("order-summary-button");

        //Handling Click Events
        ratingbutton.addEventListener('click', ()=>{
            swal({ 
                icon: 'https://i.imgur.com/4NZ6uLY.jpg',
                title: 'Thanks For Order',
                text: 'Your Order will be served soon at your table'
            })
        });

        orderbutton.addEventListener('click', ()=>{
            swal({ 
                icon: 'warning',
                title: 'Order Summary',
                text: 'Work In Progress...'
            })
        });

        // Changing Toy Model scale to initial scale
    var toy = toy.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);

    },

    getAlltoys: async function () {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      }
    });