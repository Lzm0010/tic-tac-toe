let Box = function(id) {
  this.id = id;
  this.isChosen = false;
  this.player;
}

Box.prototype = (function () {
  return {
    clear: function () {
      this.isChosen = false;
    },
    pick: function () {
      this.isChosen = true;
    },
    toHTML: function () {
      let htmlString = `<li class="box`;
      if (this.isChosen) {
        htmlString += ` box-filled-${this.player}`;
      }
      htmlString += `" id="${this.id}"></li>`;
      return htmlString;
    }
  };
}());
