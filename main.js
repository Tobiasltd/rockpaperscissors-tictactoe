const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

//Play game
function play(e) {
    restart.style.display ='inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
    const rand = Math.random();
    if(rand < 0.34) {
        return 'rock';
    } else if(rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

//Get game winner
function getWinner(p, c) {
    if(p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if(c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

function showWinner(winner, computerChoice) {
    if(winner === 'player') {
        scoreboard.player++;
        result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;   
    } else if(winner === 'computer') {
        scoreboard.computer++;
        result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;   
    } else {
        result.innerHTML = `
        <h1>It's A Draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;   
    }
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = 'block';
}
// Restart game
function restartGame () {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
}

//Clear modal
function clearModal(e) {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
}

//Event listeners
choices.forEach(choice => choice.addEventListener('click',play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

//
//
//
//
//

//Tic Tac Toe Script

//This object is used to declare a variety of statements on the .game--status class. 
//It can display the player turn or the outcome of the game.
const statusDisplay = document.querySelector('.game--status'); 

//This object is used as an if=true condition to make it possible to click cells
//Wins & losses set it to false, the restart button sets it back to true
let gameActive = true; // Uses gameActive

//This object is used to declare who's turn it is and to decide who won
//It's switched to Y if=X and to X if=Y when a cell is clicked and back to X when the game is reset
let currentPlayer = "X"; 

//This is used to set values for the cells on which the game is played 
//It has to be declared first in order to be able to give it different values (x or o) later
//It is also used to match against winning conditions later on or draws
//It is also used as an if="" condition to decide if a cell is still clickable
let gameState = ["", "", "", "", "", "", "", "", ""];

//This is an object/function which borrows from currentPlayer to show a (winning) message on the statusDisplay
//It has to be declared first in order to be used later
const winningMessage = () => `Player ${currentPlayer} has won!`;

//Same as winning, but then for draws, doesnt need a currentPlayer value though
const drawMessage = () => `Game ended in a draw!`;

//This is  shown on the statusDisplay and it activated every time a cell is clicked
//This has to be declared first so it can be used later in the handle player change function
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//This shows the default message on statusDisplay before any moves are made
//to make this we needed to declare the currentPlayer value and 
//The function that expresses the text we want to see come out of currentPlayerTurn 
statusDisplay.innerHTML = currentPlayerTurn();

//This object is declared in order to make the restart button dynamic & linked to JS
const tttrestart = document.getElementById('game--restart');

//This object is declared in order to make the score button dynamic & linked to JS
const tttscore = document.getElementById('score--restart'); 

//This sets winningconditions, all these are combo's  in which x or o has three in a row on the 9x9 grid
//There are 8 combinations possible, making this array go from [i=0] to [i=7]
//array [0], [1], [2], combined fill in all the cells
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const tscoreboard = { // Affects score button
    PlayerX: 0,
    PlayerO: 0
}

//makes the score button dynamic
const tscore = document.getElementById('ttt-score'); // Affects score button


//Firstly, a querySelectorAll selects all arrays from the .cell class. 
//These .cells are indexed manually through the data-cell-index value.
//These all get the function making it so that when they are clicked, the handleCellClick is activated on the selected cell
//handleCellClick(clickedCellEvent) then, through the const.clickedCell = clickedCellEvent.target, 
//listens for which cell is targeted
//Then we declare clickedCellIndex and set it equal to the data-cell-index through parseInt & getAttribute
//then, it reads for the gameState[clickedCellIndex] to see if the cell was clicked before
//if the gameState value of that index is NOT empty ("") or the game is not active, the function stops
//else, handleCellPlayed is activated with our newly gotten clickedCell (which is  a link to the element)
//also the clickedCellIndex is used, which is an number.
//handleCellPlayed(clickedCell, clickedCellIndex) basically says handleCellPlayed(e, #nmbr)
//handleCellPlayed sets the gameState of the selected cell to the currentPlayer value, 
//this is not shown anywhere on the html/css, but is used later for reference to check if a cell had alrdy been played
//clickedCell.innerHTML = currentPlayer then, finally, manipulates the dom to show an X or O in the grid, based on whos turn it is
//Also, the handleResultValidation is executed.
function handleCellPlayed(clickedCell, clickedCellIndex) { // Uses gameState
    gameState[clickedCellIndex] = currentPlayer; 
    clickedCell.innerHTML = currentPlayer;
}
function handleCellClick(clickedCellEvent) { // Uses gameActive
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
      );
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    
}

//This function checks if the round is won yet, otherwise it executes the handlePlayerChange function
//first it declares 'roundWon' at a value and sets roundWon to false
//then it starts a for loop, which loops through all eight winningConditions
// winCondition is declared and holds the value of the winningCondition's iteration which turn it is in the loop
//this means winCondition holds three values contained in the array, so [3, 4, 5] if i = 1 in the loop
// a is declared and lends its value from the first value in gamestate array of the specific winningCondition[i]'s iteration
//a is declared and lends its value from the second value in the gamestate array of the specific winningCondition[i]'s iteration
//a is declared and lends its value from the third value in the gamestate array of the specific winningCondition[i]'s iteration
//Then it checks if either a, b, or c holds an empty string in either of the loop iterations, meaning there is atleast one not partaking in the three-in-a-row
//then it checks if a is equal to b & c and decides it holds a winner, because that would mean there's three in a row of the same value 
//Once the roundwon if is executed, the gameActive is set to false and the winning message displayed
//The roundDraw is only true (and therefore executed) if the gameState arrays no longer hold a single empty string
function handleResultValidation() { // Uses gameActive // Uses gameState //Affects statusDisplay // // Affects score button // Decides winner 
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]]; 
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]]; 
        if (a === '' || b === '' || c === '') { 
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) { 
        statusDisplay.innerHTML = winningMessage();
        if(currentPlayer === 'X') {
            tscoreboard.PlayerX++;
        } else if (currentPlayer === 'O') {
            tscoreboard.PlayerO++;
        }
        tscore.innerHTML = `
        <p>Player X: ${tscoreboard.PlayerX}</p>
        <p>Player O: ${tscoreboard.PlayerO}</p>
        `;
        tttscore.style.display ='inline-block';
        gameActive = false; 
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); 
        gameActive = false; 
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() { // Uses gameState //Affects statusDisplay // Affects restart button
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn(); 
    tttrestart.style.display ='inline-block';
}



function handleRestartGame() { // Uses gameActive // Affects restart button
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
    tttrestart.style.display ='none';
}

function handleRestartScore() { // Affects score button
    tscoreboard.PlayerX = 0;
    tscoreboard.PlayerO = 0;
    tscore.innerHTML = `
    <p>Player X: 0</p>
    <p>Player O: 0</p>
    `;
    tttscore.style.display ='none';
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('game--restart').addEventListener('click', handleRestartGame); // Affects restart button
document.getElementById('score--restart').addEventListener('click', handleRestartScore); // Affects score button
