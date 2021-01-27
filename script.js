const maxRounds = 5;
const winnerDict = {
    'rock': 'paper',
    'paper': 'scissors',
    'scissors': 'rock'
}
var playerScore = 0;
var computerScore = 0;
var round = 0;

var chooseRock = document.getElementById('rock');
var choosePaper = document.getElementById('paper');
var chooseScissors = document.getElementById('scissors');
var startButton = document.getElementById('start');
var resultsText = document.getElementById('results');

chooseRock.style.visibility = 'hidden';
choosePaper.style.visibility = 'hidden';
chooseScissors.style.visibility = 'hidden';

startButton.onclick = game;
chooseRock.onclick = pickGesture;
choosePaper.onclick = pickGesture;
chooseScissors.onclick = pickGesture;

function pickGesture(clicked){
    var computerSelection = computerPlay();
    var playerSelection = this.id;
    round++;
    var winner = playRound(playerSelection, computerSelection);
    reportWinner(winner, playerSelection, computerSelection);
    game();
}

function computerPlay() {
    var gestures = Object.keys(winnerDict);
    var random = Math.floor(Math.random() * gestures.length);
    return gestures[random];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection == computerSelection) {
        return 'tie';
    } else if (playerSelection == winnerDict[computerSelection]) {
        return 'player';
    } else {
        return 'computer';
    }

}

function reportWinner(winner, playerSelection, computerSelection) {
    if (winner == 'player') {
        playerScore++;
        addToResults('You win, ' + playerSelection + ' beats ' + computerSelection);
    } else if (winner == 'computer') {
        computerScore++;
        addToResults('You lose, ' + computerSelection + ' beats ' + playerSelection);
    } else {
        addToResults('Tie! You both chose ' + playerSelection);
    } 
    addToResults('Player: ' + playerScore + '. Computer: ' + computerScore + '.');
}

function initialize() {
    resultsText.textContent = '';
    computerScore = 0;
    playerScore = 0;
    startButton.style.visibility = 'hidden';
    chooseRock.style.visibility = 'visible';
    choosePaper.style.visibility = 'visible';
    chooseScissors.style.visibility = 'visible';
}

function game() {
    if (round == maxRounds) {
        gameOver();
    } else if ( round == 0 ) {
        initialize();
    }
}

function gameOver() {
    round = 0;
    addToResults('Game Over!');
    startButton.style.visibility = 'visible';
    startButton.textContent = 'Play Again';
}

function addToResults(results) {
    resultsText.textContent += results + '\n';
}