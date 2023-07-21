let userCards = [];
let dealerCards = [];
let userSum = 0;
let dealerSum = 0;
let isUserAlive = false;
let hasBlackjack = false;
let userHasPocketAce = false;
let dealerIsShowingPossibleBlackjack = false;
let message = "";

const gameMessageElement = document.getElementById('game-message');

const userCardsElement = document.getElementById('user-cards');
const dealerCardsElement = document.getElementById('dealer-cards');

const userTotalElement = document.getElementById('user-total');
const dealerTotalElement = document.getElementById('dealer-total');

const startButton = document.getElementById('start-button');
const gameButtons = document.getElementById('game-buttons');
const playAgainButton = document.getElementById('play-again-button');
if (isUserAlive === false) {
    startButton.style.display = 'block';
    gameButtons.style.display = 'none';
    playAgainButton.style.display = 'none';
} 

function startGame() {
    startButton.style.display = 'none';
    let userFirstCard = getRandomNumber();
    let userSecondCard = getRandomNumber();
    let dealerFirstCard = getRandomNumber();
    let dealerSecondCard = getRandomNumber();
    if (userFirstCard === 1 && userSecondCard === 1) {
        userFirstCard = 11;
        userSecondCard = 1;
        userHasPocketAce = true;
    } else if (userFirstCard === 1 || userSecondCard === 1) {
        userFirstCard === 1 ? userFirstCard = 11 : userSecondCard = 11;
        userHasPocketAce = true;
    }
    userCards = [userFirstCard, userSecondCard];
    userSum = userFirstCard + userSecondCard;
    if (dealerFirstCard === 1 || dealerFirstCard === 10) {
        dealerIsShowingPossibleBlackjack = true;
        dealerFirstCard === 1 ? dealerFirstCard = 11 : dealerFirstCard = 10;
    } 
    if (dealerFirstCard === 1 && dealerSecondCard === 1) {
        dealerIsShowingPossibleBlackjack = true;
        dealerFirstCard = 11;
        dealerSecondCard = 1;
    }
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;
    isUserAlive = true;
    if (userSum === 21) {
        hasBlackjack = true;
    }
    renderGame();
}

function renderGame() {
    userCardsElement.textContent = "Your cards: ";
    userCards.forEach( (number) => {
        userCardsElement.textContent += number + " ";
    }); 
    userTotalElement.textContent = "Your total: " +  userSum;
    dealerCardsElement.textContent = "Dealer's cards: " + dealerCards[0];

    if (hasBlackjack === true) {
        gameMessageElement.textContent = "You got Blackjack!";
        if (dealerIsShowingPossibleBlackjack) {
            startButton.style.display = 'none';
            gameButtons.style.display = 'none';
            gameMessageElement.textContent += " Checking on the dealer";
            checkForDealerBlackjack();
        } 
    } else if (dealerIsShowingPossibleBlackjack) {
        startButton.style.display = 'none';
        gameButtons.style.display = 'none';
        gameMessageElement.textContent = " Checking on the dealer";
        checkForDealerBlackjack();
    } else {
        playUserHand();
    }
}

function getRandomNumber() {
    return Math.floor( Math.random() * 10) + 1;
}

function playUserHand() {
    if (userSum === 21 && hasBlackjack === false) {
        message = "You got 21! Checking on dealer";
        hasBlackjack = true;
        stay();
        startButton.style.display = 'none';
        gameButtons.style.display = 'none';
    } else if (userSum < 21) {
        message = "Would you like to hit or stay?";
        setTimeout( function() {
            startButton.style.display = 'none';
            gameButtons.style.display = 'block';
        }, 500);
    } else {
        message = "Sorry, you busted";
        isUserAlive = false;
        startButton.style.display = 'block';
        gameButtons.style.display = 'none';
    }
    gameMessageElement.textContent = message;
}

function hit() {
    if (isUserAlive && hasBlackjack === false) {
        let newCard = getRandomNumber();
        if (newCard === 1) {
            newCard = 11;
        }
        userSum += newCard;
        userCards.push(newCard);
        
        if (userCards.includes(11) && userSum > 21) {
            let userSum = checkForAceBust(userCards);
        }
        renderGame();
    }
}

function stay() {
    displayDealerInfo();
    generateNewDealerCard();
}

function displayDealerInfo() {
    dealerCardsElement.textContent = "Dealer's cards: ";
    dealerCards.forEach( (card) => {
        dealerCardsElement.textContent += card + " ";
    });
    dealerTotalElement.textContent = "Dealer's total: " + dealerSum;
    if (dealerSum >= 17) {
        checkWinner();
    }
}

function generateNewDealerCard() {
    setTimeout( function() {
        if (dealerSum < 22) {
            if (dealerSum < 17) {
                let dealerNextCard = getRandomNumber();
                dealerCards.push(dealerNextCard);
                dealerSum += dealerNextCard;
                if (dealerCards.includes(11) && dealerSum > 21) {
                    let dealerSum = checkForAceBust(dealerCards);
                }
                displayDealerInfo();
                generateNewDealerCard()
            }
        } 
    }, 2000);
}

function checkForAceBust(cardArr) {
    cardArr[cardArr.indexOf(11)] = 1;
    let newSum = cardArr.reduce( (previousTotal, currentTotal) => {
        return previousTotal + currentTotal;
    }, 0);
    return newSum;
}

function checkForDealerBlackjack() {
    let dealerHasBlackjack = false;
    setTimeout(function() {
        if (dealerSum === 21 && userSum === 21 ) {
            // dealerCards[0] === 1 ? dealerCards[0] = 11 : dealerCards[1] = 11;
            displayDealerInfo();
            dealerHasBlackjack = true;
            gameMessageElement.textContent = "Sorry, dealer has Blackjack. You pushed.";
        } else if (dealerSum === 21) {
            // dealerCards[0] === 1 ? dealerCards[0] = 11 : dealerCards[1] = 11;
            displayDealerInfo();
            dealerHasBlackjack = true;
            gameMessageElement.textContent = "Sorry, dealer has Blackjack. You lost";
            gameButtons.style.display = 'none';
            playAgainButton.style.display = 'block';
        } else {
            dealerHasBlackjack = false;
            dealerIsShowingPossibleBlackjack = false;
            gameMessageElement.textContent = "Dealer does not have Blackjack";
            setTimeout( function() {
                playUserHand();
            }, 2000);
        }
    }, 2000);
    // gameMessageElement.textContent = message;
    return dealerHasBlackjack;
}

function checkWinner() {
    if (dealerSum > 21) {
        gameMessageElement.textContent = "Dealer busted. You win!";
    } else if (userSum > dealerSum) {
        gameMessageElement.textContent = "Congratulations, you won!";
    } else if (userSum < dealerSum) { 
        gameMessageElement.textContent = "Sorry, you lost!";
    } else {
        gameMessageElement.textContent = "You pushed!";
    }
    gameButtons.style.display = 'none';
    playAgainButton.style.display = 'block';
    // gameMessageElement.textContent = message;
}

function playAgain() {
    playAgainButton.style.display = 'none';
    userCards = [];
    dealerCards = [];
    userSum = 0;
    dealerSum = 0; 
    hasBlackjack = false;
    userHasPocketAce = false;
    dealerIsShowingPossibleBlackjack = false;
    dealerTotalElement.textContent = "Dealer's total: ";
    startGame();
}
