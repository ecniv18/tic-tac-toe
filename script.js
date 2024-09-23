//  PLAYER FACTORY
function player(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
}

// GAMEBOARD IIFE
const gameBoard = ((playerOne, playerTwo) => {
  let winner = "";
  let playerTurn = playerOne.getMarker();
  const gameboardBoxes = [
    [box("00"), box("01"), box("02")],
    [box("10"), box("11"), box("12")],
    [box("20"), box("21"), box("22")],
  ];

  const getWinner = () => winner;
  const getGameboardBoxes = () => gameboardBoxes;

  // public
  function getBox(position) {
    let box;
    for (let i = 0; i < gameboardBoxes.length; i++) {
      for (let j = 0; j < gameboardBoxes.length; j++) {
        if (gameboardBoxes[i][j].getPosition() === position) {
          box = gameboardBoxes[i][j];
        }
      }
    }

    return box;
  }

  // private
  function box(position) {
    const getPosition = () => position;
    let marker = "";
    let marked = false;

    const markBox = (playerMarker) => {
      if (marked === true) return `Already marked by '${marker}'`;
      marked = true;
      marker = playerMarker;
    };

    const resetMarker = () => {
      marked = false;
      marker = "";
    };

    const getMarker = () => marker;

    const isMarked = () => marked;

    return { markBox, getPosition, resetMarker, getMarker, isMarked };
  }

  //   [box("00"), box("01"), box("02")],
  //   [box("10"), box("11"), box("12")],
  //   [box("20"), box("21"), box("22")],

  // public
  function evaluate() {
    let markedBoxCounter = 0;
    gameboardBoxes.forEach(row => {
      row.forEach(box => {
        if(box.isMarked()) markedBoxCounter++;
      })
    })

    if(markedBoxCounter === 9) {
      alert('draw');
      gameReset()
    }
    if (
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[0][1].getMarker() === "O" &&
        gameboardBoxes[0][2].getMarker() === "O") ||
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[1][0].getMarker() === "O" &&
        gameboardBoxes[2][0].getMarker() === "O") ||
      (gameboardBoxes[0][1].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][1].getMarker() === "O") ||
      (gameboardBoxes[0][2].getMarker() === "O" &&
        gameboardBoxes[1][2].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O") ||
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O") ||
      (gameboardBoxes[0][2].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][0].getMarker() === "O") ||
      (gameboardBoxes[1][0].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[1][2].getMarker() === "O") ||
      (gameboardBoxes[2][0].getMarker() === "O" &&
        gameboardBoxes[2][1].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O")
    ) {
      winner = playerOne.getName();
      alert(`${winner} wins`);
      gameReset();
    } else if (
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[0][1].getMarker() === "X" &&
        gameboardBoxes[0][2].getMarker() === "X") ||
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[1][0].getMarker() === "X" &&
        gameboardBoxes[2][0].getMarker() === "X") ||
      (gameboardBoxes[0][1].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][1].getMarker() === "X") ||
      (gameboardBoxes[0][2].getMarker() === "X" &&
        gameboardBoxes[1][2].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X") ||
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X") ||
      (gameboardBoxes[0][2].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][0].getMarker() === "X") ||
      (gameboardBoxes[1][0].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[1][2].getMarker() === "X") ||
      (gameboardBoxes[2][0].getMarker() === "X" &&
        gameboardBoxes[2][1].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X")
    ) {
      winner = playerTwo.getName();
      alert(`${winner} wins!`);
      gameReset();
    } 
  }

  // public
  function displayBoxes(containerSelector) {
    const container = document.querySelector(containerSelector);
    gameboardBoxes.forEach((boxRow) => {
      boxRow.forEach((box) => container.appendChild(createBoxElement(box)));
    });
  }

  // private
  function createBoxElement(box) {
    const div = document.createElement("div");
    div.classList = "box";
    div.dataset.position = box.getPosition();
    return div;
  }

  function gameStart() {
    const boxesElement = document.querySelectorAll(".box");
    boxesElement.forEach((box) => {
      box.addEventListener("click", () => {
        gameboardBoxes.forEach((row) => {
          row.forEach((gameBoardBox) => {
            if (box.dataset.position === gameBoardBox.getPosition()) {
              if (gameBoardBox.getMarker() !== "") return;
              if (playerTurn === playerOne.getMarker()) {
                gameBoardBox.markBox(playerOne.getMarker());
                box.innerText = playerOne.getMarker();
                playerTurn = playerTwo.getMarker();
              } else if (playerTurn === playerTwo.getMarker()) {
                gameBoardBox.markBox(playerTwo.getMarker());
                box.innerText = playerTwo.getMarker();
                playerTurn = playerOne.getMarker();
              }
              evaluate();
              console.log(gameBoardBox.getMarker());
            }
          });
        });
      });
    });
  }

  // private
  function gameReset() {
    const boxesElement = document.querySelectorAll(".box");
    boxesElement.forEach((box) => {
      box.innerText = "";
    });
    gameboardBoxes.forEach((row) => row.forEach((box) => box.resetMarker()));
    playerTurn = playerOne.getMarker();
    winner = "";
  }

  return { evaluate, getWinner, getGameboardBoxes, displayBoxes, gameStart };
})(player("Player One", "O"), player("Player Two", "X"));

// INIT
gameBoard.displayBoxes(".board");
gameBoard.gameStart();
