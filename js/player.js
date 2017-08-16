let Player = function (id, symbol, name="Computer") {
  this.boxes = [];
  this.id = id;
  this.isActive = false;
  this.name = name;
  this.symbol = symbol;
}

//methods are listed in alphabetical order
Player.prototype = (function() {
  return {
    clearBoxes: function() {
      this.boxes = [];
    },
    displaySymbol: function(box) {
      //if background property is empty then set background property
      if (box.style.backgroundImage === ""){
        let urlString = `url(img/${this.symbol}.svg)`;
        box.style.backgroundImage = urlString;
      }
    },
    hideSymbol: function(box) {
      if (box.style.backgroundImage !== ""){
        box.style.backgroundImage = "";
      }
    },
    makeActive: function() {
      this.isActive = true;
    },
    makeInactive: function() {
      this.isActive = false;
    },
    pickBox: function(box) {
      //set box player property to player picking it
       box.player = this.id;
       //make box unavailable
       box.pick();
       //grab and push actual box
       this.boxes.push(box);
    },
    toHTML: function() {
      let htmlString = `<li class="players`;
      if (this.isActive){
        htmlString += ` active`;
      }
      htmlString += `" id="player${this.id}">`;
      htmlString += `<span class="name">${this.name}</span>`;
      htmlString += `<img src="img/${this.symbol}.svg" alt="${this.symbol}" />`;
      htmlString += `</li>`;
      return htmlString;
    }
  };
}());
