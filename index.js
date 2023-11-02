const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");

const playerX = document.getElementById("x");
const playerO = document.getElementById("o");

playerO.classList.add("highlight-player");

let player = "o";
let idList_o = [];
let idList_x = [];
let idList = [];

let winningPattern = [];

const line = document.createElement("div");
const line2 = document.createElement("div");

//scores
let scoreO = 0;
let scoreX = 0;

// BLOCK FURTHER BOX CHECKING
const blockade = document.createElement("div");



initGame();

function initGame() {

    boxes.forEach(box => {
        box.addEventListener("click", checkInput);
    });

    reset.addEventListener("click", resetScore);
    clear.addEventListener("click", clearScore);
}

function checkInput(e) {
    let x = 0
    if (player == "o" && !idList.includes(e.target.id)) {
        idList.push(e.target.id);
        idList_o.push(e.target.id);
        e.target.textContent = "o";
        checkForWin();
        x = 1;

    } else if (player == "x" && !idList.includes(e.target.id)) {
        idList.push(e.target.id);
        idList_x.push(e.target.id);
        e.target.textContent = "x";
        checkForWin();
        x = 1;
    }

    if (x === 1) {
        toggleClass();
    }

}

function checkForWin() {
    const patterns = ["123", "456", "789", "147", "258", "369", "159", "357"];
    let list = [];
    if (player === "o") {
        list = idList_o;
    } else if (player === "x") {
        list = idList_x;
    } else {
        window.alert("Coś się zjebało");
    }


    for (let pattern of patterns) {
        let count = 0;
        for (let number of list) {
            if (pattern.includes(number)) {
                count++;
            }
            if (count == 3) {
                winningPattern.push(pattern);

            }
        }
    }
    if (winningPattern.length !== 0) {
        //window.alert(`${player} wins with ${winningPattern}`);
        drawLines();

    }
}

function drawLines() {

    let typeOfPatternVar = typeOfPattern();

    console.log(typeOfPatternVar, "aaaa")

    if (typeOfPatternVar.length === 2 || typeOfPatternVar.length === 4) {
        board.append(line);

        line.classList.add("line");
        line.classList.add(`line-${typeOfPatternVar[0]}`);
        line.classList.add(`line-${typeOfPatternVar[1]}`);
        console.log(line);
    }

    if (typeOfPatternVar.length === 4) {
        board.append(line2);

        line2.classList.add("line");
        line2.classList.add(`line-${typeOfPatternVar[2]}`);
        line2.classList.add(`line-${typeOfPatternVar[3]}`);
        console.log(line2);
    }

    addScore();
    addBlockade();
}

function typeOfPattern() {
    const diagonalPatterns = ["159", "357"];
    const horizontalPatterns = ["123", "456", "789"];
    const verticalPatterns = ["147", "258", "369"];

    let typeOfPatternVar = [];

    for (pattern of winningPattern) {
        if (verticalPatterns.includes(pattern)) {
            typeOfPatternVar.push("vertical");
            typeOfPatternVar.push(specificPattern(pattern));
        } else if (horizontalPatterns.includes(pattern)) {
            typeOfPatternVar.push("horizontal");
            typeOfPatternVar.push(specificPattern(pattern));
        }
        else if (diagonalPatterns.includes(pattern)) {
            typeOfPatternVar.push("diagonal");
            typeOfPatternVar.push(specificPattern(pattern));
        }
    }
    return typeOfPatternVar;
}
/* 
147 - pattern 1
258 - pattern 2
369 - pattern 3
123 - pattern 4
456 - pattern 5
789 - pattern 6
159 - pattern 7
357 - pattern 8
*/
function specificPattern(pattern) {
    const patternsInOrder = ["147", "258", "369", "123", "456", "789", "159", "357"];

    if (pattern === patternsInOrder[0]) {
        return "1";
    } else if (pattern === patternsInOrder[1]) {
        return "2";
    } else if (pattern === patternsInOrder[2]) {
        return "3";
    } else if (pattern === patternsInOrder[3]) {
        return "4";
    } else if (pattern === patternsInOrder[4]) {
        return "5";
    } else if (pattern === patternsInOrder[5]) {
        return "6";
    } else if (pattern === patternsInOrder[6]) {
        return "7";
    } else if (pattern === patternsInOrder[7]) {
        return "8";
    }
}

function addScore() {
    if (player === "x") {
        scoreX++;
        playerX.textContent = `X :  ${scoreX}`;
    } else if (player === "o") {
        scoreO++;
        playerO.textContent = `O :  ${scoreO}`;
    }
}

function toggleClass() {
    if (player === "o") {
        player = "x";
        playerO.classList.remove("highlight-player");
        playerX.classList.add("highlight-player");
    } else {
        player = "o";
        playerX.classList.remove("highlight-player");
        playerO.classList.add("highlight-player");
    }
}

function resetScore() {
    idList_o = [];
    idList_x = [];
    idList = [];

    winningPattern = [];

    boxes.forEach(box => {
        box.textContent = "";
    })

    line.className = "";
    line2.className = "";
    line.remove();
    line2.remove();
    
    removeBlockade();
}

function clearScore() {
    player = "o";

    idList_o = [];
    idList_x = [];
    idList = [];

    winningPattern = [];

    playerX.classList.remove("highlight-player");
    playerO.classList.add("highlight-player");

    boxes.forEach(box => {
        box.textContent = "";
    });

    line.className = "";
    line2.className = "";

    line.remove();
    line2.remove();

    playerX.textContent = `X`;
    playerO.textContent = `O`;

    scoreO = 0;
    scoreX = 0;
    removeBlockade();
}

function addBlockade(){
    board.append(blockade);
    blockade.classList.add("blockade");

}
function removeBlockade(){
    blockade.classList.remove("blockade");
    blockade.remove(); 
}