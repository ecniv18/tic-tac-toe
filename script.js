// GAMEBOARD IIFE
const gameBoard = ((playerOne, playerTwo) => {
  let winner = "";
  const gameboardBoxes = [
    [box("00"), box("01"), box("02")],
    [box("10"), box("11"), box("12")],
    [box("20"), box("21"), box("22")],
  ];

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

    return { markBox, getPosition, resetMarker, getMarker };
  }

  //   [box("00"), box("01"), box("02")],
  //   [box("10"), box("11"), box("12")],
  //   [box("20"), box("21"), box("22")],

  function evaluate() {
    if (
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[0][1].getMarker() === "O" &&
        gameboardBoxes[0][2].getMarker() === "O") ||
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[1][0].getMarker() === "O" &&
        gameboardBoxes[2][0].getMarker() === "O") ||
      (gameboardBoxes[0][1].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O") ||
      (gameboardBoxes[0][2].getMarker() === "O" &&
        gameboardBoxes[1][2].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O") ||
      (gameboardBoxes[0][0].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][2].getMarker() === "O") ||
      (gameboardBoxes[0][2].getMarker() === "O" &&
        gameboardBoxes[1][1].getMarker() === "O" &&
        gameboardBoxes[2][0].getMarker() === "O")
    ) {
      winner = playerOne.getName();
    } else if (
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[0][1].getMarker() === "X" &&
        gameboardBoxes[0][2].getMarker() === "X") ||
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[1][0].getMarker() === "X" &&
        gameboardBoxes[2][0].getMarker() === "X") ||
      (gameboardBoxes[0][1].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X") ||
      (gameboardBoxes[0][2].getMarker() === "X" &&
        gameboardBoxes[1][2].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X") ||
      (gameboardBoxes[0][0].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][2].getMarker() === "X") ||
      (gameboardBoxes[0][2].getMarker() === "X" &&
        gameboardBoxes[1][1].getMarker() === "X" &&
        gameboardBoxes[2][0].getMarker() === "X")
    ) {
      winner = playerTwo.getName();
    }
  }

  // EXAMPLE:
  // getBox("20").markBox(playerTwo.getMarker()); => marked the box at the position "20" with playerTwo's marker "X"
  // getBox("11").markBox(playerTwo.getMarker()); => ^ position "11"
  // getBox("02").markBox(playerTwo.getMarker()); => ^ position "02"
  // evaluate(); => since boxes at the positions "20", "11", and "02" completed a winning line [at ln:86] this function sets the winner variable to playerTwo's name "Player Two"
})(player("Player One", "O"), player("Player Two", "X"));

//  PLAYER FACTORY
function player(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
}
