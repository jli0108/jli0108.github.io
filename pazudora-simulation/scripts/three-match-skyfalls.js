class Orb {
    constructor(color, matched, checkedMatches) {
      this.color = color; /* using 0,1,2,3,4,5 for colors */
      this.matched = matched; /* used to process matches */
      this.checkedMatches = checkedMatches;
    }
  }

  var maxRows = 2;
  var maxCols = 2;
  var numColors = 6;
  var board;

  function resetBoard() {
    board = new Array(maxRows);
    for (var i = 0; i < maxRows; i++) {
      board[i] = new Array(maxCols);
    }
    for (var i = 0; i < maxRows; i++) {
      for (var j = 0; j < maxCols; j++) {

        board[i][j] = new Orb(Math.floor(numColors * Math.random()), false, false);

      }
    }
  }

  function printBoard() {
    document.getElementById("combos").innerHTML = "Combos: " + countCombos();
    var debug = document.getElementById("debug");
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    var images = new Array(maxRows);
    for (var i = 0; i < maxRows; i++) {
      images[i] = new Array(maxCols);
    }
    for (var i = 0; i < maxRows; i++) {
      for (var j = 0; j < maxCols; j++) {
        images[i][j] = new Image();
      }
    }
    debug.innerHTML = "";
    boardString = "";
    for (var i = 0; i < maxRows; i++) {
      for (var j = 0; j < maxCols; j++) {
        switch (board[i][j].color) {
          case (0):
            boardString += "H";
            debug.append("H");
            images[i][j].src = "assets/orb-H.png";
            break;
          case (1):
            boardString += "R";
            debug.append("R");
            images[i][j].src = "assets/orb-R.png";
            break;
          case (2):
            boardString += "B";
            debug.append("B");
            images[i][j].src = "assets/orb-B.png";
            break;
          case (3):
            boardString += "G";
            debug.append("G");
            images[i][j].src = "assets/orb-G.png";
            break;
          case (4):
            boardString += "L";
            debug.append("L");
            images[i][j].src = "assets/orb-L.png";
            break;
          case (5):
            boardString += "D";
            debug.append("D");
            images[i][j].src = "assets/orb-D.png";
            break;
        }
        ctx.drawImage(images[i][j], j*50, i*50, 50, 50);
      }
      if (i < maxRows - 1) {
        boardString += "\n";
        debug.appendChild(document.createElement("br"));
      }
    }
    console.log(boardString);
  }
  function adjacentMatch(i, j) {
    /* checks whether the orb at row i, column j is part of another match (same color) */
    if ((i > 0 && board[i][j].color == board[i - 1][j].color && board[i - 1][j].matched) ||
          (i < maxRows - 1 && board[i][j].color == board[i + 1][j].color && board[i + 1][j].matched) ||
          (j > 0 && board[i][j].color == board[i][j - 1].color && board[i][j - 1].matched) ||
          (j < maxCols - 1 && board[i][j].color == board[i][j + 1].color && board[i][j + 1].matched)) {
          return true;
    }
  }
  function countCombos() {
    var comboCount = 0;
    for (var i = 0; i < maxRows; i++) {
      for (var j = 0; j < maxCols; j++) {
        board[i][j].matched = false;
        board[i][j].checkedMatches = false;
      }
    }
    function checkMatches(i, j) {
      /* checks if orb at position i,j is part of a 3-match; if so, labels it as matched = true and does the same for other orbs within the same match*/
      for (var k = 0; k < 3; k++) {
        if ((i - k >= 0) && (i - k + 2 < maxRows) && board[i - k][j].color == board[i - k + 1][j].color && board[i - k + 1][j].color == board[i - k + 2][j].color) {
          if (!board[i - k + 2][j].matched && !board[i - k + 1][j].matched && !board[i - k][j].matched
          && !adjacentMatch(i - k + 2, j) && !adjacentMatch(i - k + 1, j) && !adjacentMatch(i - k, j)) {
            comboCount++;
          }
          board[i - k + 2][j].matched = board[i - k + 1][j].matched = board[i - k][j].matched = true;
        }
        if ((j - k >= 0) && (j - k + 2 < maxCols) && board[i][j - k].color == board[i][j - k + 1].color && board[i][j - k + 1].color == board[i][j - k + 2].color) {
          if (!board[i][j - k + 2].matched && !board[i][j - k + 1].matched && !board[i][j - k].matched
          && !adjacentMatch(i, j - k + 2) && !adjacentMatch(i, j - k + 1) && !adjacentMatch(i, j - k)) {
            comboCount++;
          }
          board[i][j - k + 2].matched = board[i][j - k + 1].matched = board[i][j - k].matched = true;
        }
      }
      board[i][j].checkedMatches = true;
      if (i - 1 >= 0 && board[i][j].color == board[i - 1][j].color && !board[i - 1][j].checkedMatches) {
        checkMatches(i - 1, j);
      }
      if (i + 1 < maxRows && board[i][j].color == board[i + 1][j].color && !board[i + 1][j].checkedMatches) {
        checkMatches(i + 1, j);
      }
      if (j - 1 >= 0 && board[i][j].color == board[i][j - 1].color && !board[i][j - 1].checkedMatches) {
        checkMatches(i, j - 1);
      }
      if (j + 1 < maxCols && board[i][j].color == board[i][j + 1].color && !board[i][j + 1].checkedMatches) {
        checkMatches(i, j + 1);
      }
    }

    for (var i = 0; i < maxRows; i++) {
      for (var j = 0; j < maxCols; j++) {
        if (!board[i][j].checkedMatches) {
          checkMatches(i, j);
        }
      }
    }
    return comboCount;
  }

  function generateNewBoard() {
    setDimensions();
    resetBoard();
    printBoard();
  }
  document.getElementById("generateNewBoard").addEventListener("click", generateNewBoard);

  /* use after counting matches */
  function clearMatchedOrbs() {
    let numMatched;
    for (j = 0; j < maxCols; j++) {
      numMatched = 0;
      for (i = maxRows - 1; i >= 0; i--) {
        if (!board[i][j].matched) {
          board[i + numMatched][j].color = board[i][j].color;
          board[i + numMatched][j].matched = false;
          board[i + numMatched][j].checkedMatches = false;
          k--;
        } else {
          numMatched++;
        }
      }
      for (var k = 0; k < numMatched; k++) {
        board[k][j] = new Orb(Math.floor(numColors * Math.random()), false, false);
      }
    }
  }

  function getResults() {
    setDimensions();
    var trials = document.getElementById("trialInput").value;
    var maxPossibleCombos = 30;
    var combos = new Array(maxPossibleCombos + 1);
    combos.fill(0);
    var result = "";
    var average = 0;
    var tempCombos; // skyfalls & cascades
    // var additionalCombos;
    if (trials > 0) {
      for (var i = 0; i < trials; i++) {
        tempCombos = 0;
        resetBoard();
        /*combos[countCombos()]++;
        average += countCombos();*/
        /* for skyfalls */
        /*
        console.log("initial board:");
        printBoard();
        additionalCombos = countCombos();
        console.log("combos: " + additionalCombos);
        */
        while (countCombos() > 0) {
          tempCombos += countCombos();
          // console.log("temp combos... " + tempCombos)
          clearMatchedOrbs(); // clears matched orbs and causes orbs to fall
          /*
          console.log("printing new board:");
          printBoard();
          */
        }
        /*
        console.log("final board:");
        printBoard();
        console.log("temp combos (final): " + tempCombos);
        */
        if (tempCombos < 30) {
          combos[tempCombos]++;
          average += tempCombos;
        } else {
          console.log(">= 30 combos, absolutely insane");
        }
      }
      average /= trials;
      for (var i = 0; i <= maxPossibleCombos; i++) {
        result += i + " combo";
        if (i != 1) {
          result += "s";
        }
        result += ": " + combos[i] / trials;
        if (i < maxPossibleCombos) {
          result += "<br>";
        }
      }
      document.getElementById("results").innerHTML = "Average combos: " + average + "<br>" + "Distribution: <br>" + result;
    } else {
      document.getElementById("results").innerHTML = "Unexpected input";
    }
  }
  document.getElementById("getResults").addEventListener("click", getResults);

  function setDimensions() {
    maxRows = document.getElementById("rowInput").value;
    maxCols = document.getElementById("colInput").value;
    var canvas = document.getElementById("board");
    canvas.height = maxRows * 50;
    canvas.width = maxCols * 50;
  }