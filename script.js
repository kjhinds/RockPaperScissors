const maxRounds = 5;
const weaponDict = {
    'rock': 'paper',
    'paper': 'scissors',
    'scissors': 'rock'
}
let playerScore = 0;
let computerScore = 0;
let round = 0;

const gameLog = document.getElementById('gameLog');

const startButton = document.getElementById('start');
startButton.addEventListener('click', initialize);

const computerWeaponImg = document.getElementById('computerWeapon');
const playerWeaponImg = document.getElementById('playerWeapon');

const roundText = document.getElementById('roundText');
const resultsText = document.getElementById('resultsText');
const scoresText = document.getElementById('scoresText');

function initialize() {
    round = 0;
    computerScore = 0;
    playerScore = 0;
    displayWeapons();
    startButton.style.visibility = 'hidden';
    const gameOverDiv = document.getElementById('gameover');
    gameOverDiv.style.visibility = 'hidden';
    gameLog.style.visibility = 'hidden';
}

const container = document.getElementById('container');

function displayWeapons() {
    let weapons = Object.keys(weaponDict);
    weapons.forEach(weapon => {
        const button = document.createElement("BUTTON");
        button.innerHTML = `<img src='${weapon}.png' alt='${weapon}'>`
        button.id = weapon;
        button.addEventListener('click', weaponPicked);
        container.appendChild(button);
    });
}

function weaponPicked(){
    let computerSelection = computerPlay();
    let playerSelection = this.id;
    round++;
    let winner = playRound(playerSelection, computerSelection);
    reportWinner(winner, playerSelection, computerSelection);
    if (round == maxRounds) {
        gameOver();
    }
}

function gameOver() {
    removeWeapons();
    startButton.style.visibility = 'visible';
    startButton.textContent = 'Play Again';
    const gameOverDiv = document.getElementById('gameover');
    gameOverDiv.style.visibility = 'visible';
}

function removeWeapons() {
    let weapons = Object.keys(weaponDict);
    weapons.forEach(weapon => {
        let button = document.getElementById(weapon);
        container.removeChild(button);
    });
}

function computerPlay() {
    let weapons = Object.keys(weaponDict);
    let random = Math.floor(Math.random() * weapons.length);
    return weapons[random];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    playerWeaponImg.src = `${playerSelection}.png`;
    computerWeaponImg.src = `${computerSelection}.png`;

    if (playerSelection == computerSelection) {
        return 'tie';
    } else if (playerSelection == weaponDict[computerSelection]) {
        return 'player';
    } else {
        return 'computer';
    }

}

function reportWinner(winner, playerSelection, computerSelection) {
    gameLog.style.visibility = 'visible';
    if (winner == 'player') {
        playerScore++;
        resultsText.textContent = `You win, ${playerSelection} beats ${computerSelection}`;
    } else if (winner == 'computer') {
        computerScore++;
        resultsText.textContent = `You lose, ${computerSelection} beats ${playerSelection}`;
    } else {
        resultsText.textContent = `Tie! You both chose ${playerSelection}`;
    } 
    scoresText.textContent = `Player: ${playerScore}  Computer: ${computerScore}`;
    roundText.textContent = `Round: ${round}`
}
