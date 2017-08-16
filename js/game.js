let Game = function (player1, player2) {
  this.boxes = [];
  this.player1 = player1;
  this.player2 = player2;
  this.scores = [];
  this.winner;


  //board positions
  //[0][1][2]
  //[3][4][5]
  //[6][7][8]
  this.winningCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
  ];
}

//methods listed in aplhabetical order
Game.prototype = (function () {
  return {
    changePlayer: function(activePlayer, inactivePlayer){
      activePlayer.makeInactive();
      inactivePlayer.makeActive();
    },
    checkIfWon: function(player) {
      //uses array helper to see the a winning combo is contained in the players chosen boxes array
      //if one exists he is the winner of the game
      let boxIds = player.boxes.map(box => box.id);
        if(this.winningCombos.some(combo => arrayContainsArray(boxIds, combo))){
          return this.winner = player;
        }
    },
    computerChoice: function(player, opponent){
      let remainingBoxes = this.getAvailableMoves();
      let playerBoxes = player.boxes.map(box => box.id);
      let opponentBoxes = opponent.boxes.map(box => box.id);
      let winCombo = [];
      let defendCombo = [];
      let box;
      //create an array of all possible player options
      let possiblePlayerCombos = remainingBoxes.map(box => {
         return playerBoxes.concat(box);
      });
      //create an array of all possible opponent options
      let possibleOpponentCombos = remainingBoxes.map(box => {
        return opponentBoxes.concat(box);
      });

      //check to see if player needs to be defended
      possibleOpponentCombos.map(combo => {
        this.winningCombos.forEach(winner => {
          if (arrayContainsArray(combo, winner)){
            defendCombo.push(winner);
          }
        });
      });

      //if defense combo has been pushed
      if (defendCombo[0] != null){
        //get box that will defend and that computer doesn't own yet
        let choice = defendCombo[0].filter(i => {
          if (opponentBoxes.indexOf(i) < 0) {
            return true;
          } else {
            return false;
          }
        });
        //set the box from id
        box = this.boxes[choice];
      }

      //check to see if computer can win
      possiblePlayerCombos.map(combo => {
        this.winningCombos.forEach(winner => {
          if (arrayContainsArray(combo, winner)){
            //push winning combo to array to be compared later
            winCombo.push(winner);
          }
        });
      });

      //if best combo has been pushed
      if (winCombo[0] != null){
        //get the potential box that isn't in the computers boxes yet
        let choice = winCombo[0].filter(i => {
          if (playerBoxes.indexOf(i) < 0) {
            return true;
          } else {
            return false;
          }
        });
        //set the box from the id
        box = this.boxes[choice];
      }


      //if box has been set by defend or winner then pick the box
      if (box != null){
        player.pickBox(box);
        //if middle box isn't chosen choose that box
      } else if (!this.boxes[4].isChosen){
        box = this.boxes[4];
        player.pickBox(box);
      } else {
        //otherwise pick a random box
        let choice = remainingBoxes[Math.floor(Math.random() * remainingBoxes.length)];
        box = this.boxes[choice];
        player.pickBox(box);
      }

    },
    getAvailableMoves: function() {
      //uses array filter to grab all boxes that arent chosen and then maps that array to ids
      let remainingBoxes = this.boxes.filter(box => !box.isChosen);
      let remainingBoxIds = remainingBoxes.map(box => box.id);

      return remainingBoxIds;
    },
    over: function() {
      return this.boxes.every(box => box.isChosen);
    },
    renderBoard: function(players, board){
      //add players to game screen with changed active classes
      players.innerHTML = "";
      players.innerHTML += this.player1.toHTML();
      players.innerHTML += this.player2.toHTML();

      //render boxes - adds filled class each time something is picked
      board.innerHTML = "";
      for(i = 0; i < 9; i++){
        board.innerHTML += this.boxes[i].toHTML();
      }
    },
    renderNewGame: function(players, board) {
      //render new board
      board.innerHTML = "";
      for(i = 0; i < 9; i++){
        let box = new Box(i);
        //push box to boxes array for game
        this.boxes.push(box);
        board.innerHTML += box.toHTML();
      }

      //make player 1 active player
      this.player1.makeActive();

      //add players to new game screen
      players.innerHTML = "";
      players.innerHTML += this.player1.toHTML();
      players.innerHTML += this.player2.toHTML();
    }
  };
}());
