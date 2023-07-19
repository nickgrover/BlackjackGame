let userCards = [];
let dealerCards = [];
let userSum = 0;
let dealerSum = 0;
let isUserAlive = false;
let hasBlackjack = false;
let userHasPocketAce = false;
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
    // let userFirstCard = getRandomNumber();
    // let userSecondCard = getRandomNumber();
    let userFirstCard = 10;
    let userSecondCard = 1;
    let dealerFirstCard = getRandomNumber();
    let dealerSecondCard = getRandomNumber();
    if (userFirstCard === 1 && userSecondCard === 1) {
        userFirstCard = 11;
        userSecondCard = 1;
        userHasPocketAce = true;
        // handleUserHasPocketAces();
    } else if (userFirstCard === 1 || userSecondCard === 1) {
        userFirstCard === 1 ? userFirstCard = 11 : userSecondCard = 11;
        userHasPocketAce = true;
    }
    userCards = [userFirstCard, userSecondCard];
    userSum = userFirstCard + userSecondCard;
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;
    isUserAlive = true;
    if (userSum = 21) {
        hasBlackjack = true;
    }
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


    if (hasBlackjack) {
        message = "You got Blackjack!";
        if (dealerCards[0] === 1 || dealerCards[0] === 10) {
            message += " Checking on the dealer"
        } 
    } else if (userSum === 21 && hasBlackjack === false) {
        // message = "You got Blackjack!";
        message = "You got 21!";
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
        if (userHasPocketAce && userSum > 21) {
            userCards[0] === 11 ? userCards[0] = 1 : userCards[1] = 1;
            userSum = userCards.reduce( (previousTotal, currentTotal) => {
                return previousTotal + currentTotal;
            }, 0);
        }
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
        if (dealerSum < 22) {
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

// function handleUserHasPocketAces() {
//         userFirstCard = 11;
//         userSecondCard = 1;
//         userCards = [userFirstCard, userSecondCard];
//         userSum = userFirstCard + userSecondCard;
// }