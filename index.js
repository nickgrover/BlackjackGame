let userCards = [];
let dealerCards = [];
let userSum = 0;
let dealerSum = 0;
let isUserAlive = false;
let hasBlackjack = false;
let message = "";

let gameMessageElement = document.getElementById('game-message');

let userCardsElement = document.getElementById('user-cards');
let dealerCardsElement = document.getElementById('dealer-cards');

let userTotalElement = document.getElementById('user-total');
let dealerTotalElement = document.getElementById('dealer-total');

let shownButtons = document.getElementById('buttons');
let startButton = document.getElementById('start-button');
let gameButtons = document.getElementById('game-buttons');
if (isUserAlive === false) {
    startButton.style.display = 'block';
    gameButtons.style.display = 'none';
} 

function startGame() {
    let userFirstCard = getRandomNumber();
    let userSecondCard = getRandomNumber();
    let dealerFirstCard = getRandomNumber();
    let dealerSecondCard = getRandomNumber();
    userCards = [userFirstCard, userSecondCard];
    dealerCards = [dealerFirstCard, dealerSecondCard];
    userSum = userFirstCard + userSecondCard;
    dealerSum = dealerFirstCard + dealerSecondCard;
    isUserAlive = true;
    startButton.style.display = 'none';
    gameButtons.style.display = 'block';
    renderGame();
}

function renderGame() {
    userCardsElement.textContent = "Your cards: "
    userCards.forEach( (number) => {
        if (number === 1) {
            
        }
        userCardsElement.textContent += number + " ";
    }); 
    userTotalElement.textContent = "Your total: " +  userSum;
    dealerCardsElement.textContent = "Dealer's cards: " + dealerCards[0];
    // dealerCardsElement.textContent = "Dealer's cards: "
    // dealerCards.forEach( (number) => {
    //     dealerCardsElement.textContent += number + " ";
    // });


    if (userSum === 21) {
        message = "You got Blackjack!";
        hasBlackjack = true;
        startButton.style.display = 'block';
        gameButtons.style.display = 'none';
    } else if (userSum < 21) {
        message = "Would you like to hit or stay?";
    } else {
        message = "Sorry, you busted";
        isUserAlive = false;
        startButton.style.display = 'block';
        gameButtons.style.display = 'none';
    }
    gameMessageElement.innerText = message;


}

function getRandomNumber() {
    return Math.floor( Math.random() * 10) + 1;
}

function hit() {
    if (isUserAlive && hasBlackjack === false) {
        let newCard = getRandomNumber();
        userSum += newCard;
        userCards.push(newCard);
        renderGame();
    }
}

function stay() {
    displayDealerInfo();
    generateNewDealerCard();

}

function displayDealerInfo() {
    let lastCard = dealerCards[dealerCards.length - 1]
    dealerCardsElement.textContent +=  " " + lastCard;
    dealerTotalElement.textContent = "Dealer's total: " + dealerSum;
}

function generateNewDealerCard() {
    setTimeout( function() {
        if (dealerSum < 40) {
            if (dealerSum < 17) {
                let dealerNextCard = getRandomNumber();
                dealerCards.push(dealerNextCard);
                dealerSum += dealerNextCard;
                displayDealerInfo();
                generateNewDealerCard()
            }
        }
    }, 2000);
}