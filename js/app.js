(function(){

  /*-----------------
  VARIABLES - THE GAME
  ------------------*/

  //create players
  let player1;
  let player2 = new Player(2, "x");
  let activePlayer;
  let inactivePlayer;
  let winner;

  //create game
  let game;
  let board = document.querySelector('.boxes');
  let players = document.getElementById('the-players');
  let chosenBox;


  /*-----------------
  VARIABLES - ELEMENTS
  ------------------*/

  //elements to create screen
  const container = document.querySelector('#container');
  const div = document.createElement('div');
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const a = document.createElement('a');
  const input = document.createElement('input');
  const tieText = document.createTextNode("It's a tie!");
  let winnerText;

  //all screens
  const myboard = document.getElementById('board');
  const myScreen = createScreen("screen screen-start", "start", "Start game");
  let finishScreen;


  /*-----------------
  FUNCTIONS
  ------------------*/

  //creates start/board/win screen based on id passed in
  function createScreen(className, id, buttonText) {
    container.appendChild(div);
    div.setAttribute("class", className);
    div.setAttribute("id", id);
    div.appendChild(header);
    header.appendChild(h1);
    h1.innerText = "Tic Tac Toe";

    //add input on start screen
    if (id === "start"){
      header.appendChild(input)
      input.setAttribute("placeholder", "Enter your name");
      input.setAttribute("name", "user_name");
      input.setAttribute("type", "text");
      input.setAttribute("id", "name");
    }

    //add paragraph if finish screen
    if (id === "finish"){
      if (header.firstChild === input){
        header.removeChild(input);
      }
      header.appendChild(p);
      p.setAttribute("class", "message");

      //add different messages & classes for the 3 different outcomes
      //tie
      if (winner == null){
        if (p.firstChild === winnerText){
          p.removeChild(winnerText);
        }
        p.appendChild(tieText);
        div.className += " screen-win-tie";
      } else {

        //first player wins
        if (winner.id === 1){
          //remove previous message
          if (p.firstChild === tieText){
            p.removeChild(tieText);
          } else if (p.firstChild === winnerText){
            p.removeChild(winnerText);
          }
          //assign new message
          winnerText = document.createTextNode(`${player1.name} Wins!`);
          p.appendChild(winnerText);
          div.className += " screen-win-one";

          //second player wins
        } else if (winner.id === 2) {
          //remove previous message
          if (p.firstChild === tieText){
            p.removeChild(tieText);
          } else if (p.firstChild === winnerText){
            p.removeChild(winnerText);
          }
          //assign new message
          winnerText = document.createTextNode(`${player2.name} Wins!`);
          p.appendChild(winnerText);
          div.className += " screen-win-two";
        }
      }
    }

    //continue adding elements to screen
    header.appendChild(a);
    a.setAttribute('href', '#');
    a.setAttribute('class', 'button');
    a.innerText = buttonText;

    //return div element
    return div;
  }


  //gets active player
  function getActivePlayer(){
    if (player1.isActive){
      return player1;
    } else {
      return player2;
    }
  }


  //gets inactive player
  function getInactivePlayer(){
    if (player1.isActive){
      return player2;
    } else {
      return player1;
    }
  }


  /*-----------------
  EVENTS
  ------------------*/

  //load the game board upon click
  myScreen.addEventListener('click', function(e){
    if(e.target.parentNode.parentNode.id === "start" && e.target.nodeName === "A"){
      //grab user name
      let userName = input.value;
      //store it
      player1 = new Player(1, "o", userName);
      //create game
      game = new Game(player1, player2);

      //hide start screen
      addClass(myScreen, "hidden");

      //render new game to screen
      game.renderNewGame(players, board);
    } else if (e.target.parentNode.parentNode.id === "finish"){
      //hide finishScreen
      addClass(finishScreen, "hidden");
      // reset players
      player1.makeInactive();
      player2.makeInactive();
      player1.clearBoxes();
      player2.clearBoxes();
      //start a new game
      removeClass(myboard, "hidden");
      addClass(myboard, "board");
      game = new Game(player1, player2);
      game.renderNewGame(players, board);
    }
  });

  //on mouseover of empty box display x or o depending on active player
  board.addEventListener('mouseover', function(e){
    chosenBox = game.boxes[e.target.id];
    //only show symbol if box is empty
    if (!chosenBox.isChosen){
      activePlayer = getActivePlayer();
      activePlayer.displaySymbol(e.target);
    }
  });

  //mouseout change the box back to empty background
  board.addEventListener('mouseout', function(e){
    activePlayer = getActivePlayer();
    activePlayer.hideSymbol(e.target);
  });

  //on click active player places symbol
  board.addEventListener('click', function(e){
    //retrieve active, inactive players and box
    activePlayer = getActivePlayer();
    inactivePlayer = getInactivePlayer();
    chosenBox = game.boxes[e.target.id];

    //if box is chosen dont allow it to be rechosen then proceed with pick
    if (!chosenBox.isChosen){
      //pick box and check if player won
      activePlayer.pickBox(chosenBox);
      winner = game.checkIfWon(activePlayer, "real");
      if (game.over() || winner) {
        //hide game board and display finish screen;
        finishScreen = createScreen("screen screen-win", "finish", "New game");
        addClass(myboard, "hidden");
        winner = null;
      } else {
        //change players and re-render board
        game.changePlayer(activePlayer, inactivePlayer);
        game.renderBoard(players, board);
        //computer picks
        game.computerChoice(inactivePlayer, activePlayer);

        //re run through change of turn scenarios
        winner = game.checkIfWon(inactivePlayer);
        if (game.over() || winner) {
          finishScreen = createScreen("screen screen-win", "finish", "New game");
          addClass(myboard, "hidden");
          winner = null;
        } else {
          game.changePlayer(inactivePlayer, activePlayer);
          game.renderBoard(players, board);
        }
      }
    }
  });

}());
