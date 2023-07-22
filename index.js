function buildDeck() {
    const values = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = [ 'Hearts', 'Diamonds', 'Spades', 'Clubs'];
    const cards = [];
    for (let s = 0; s < suits.length; s++ ) {
        for (let v = 0; v < values.length; v++) {
            const value = values[v];
            const suit = suits[s];
            cards.push({ value, suit});
        }
    }
    return cards;
}

function getRandomCard(cards) {
    const random = Math.floor( Math.random() * 51) + 1;
    let playingCard = {
        value: cards[random].value,
        suit: cards[random].suit,
        entity: null
    }
    playingCard.suit === "Diamonds" ? (playingCard.entity = "&diams;") : (playingCard.entity = "&" + playingCard.suit.toLowerCase() + ";");
    return playingCard;
}

let deck = [];
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
const userTotalElement = document.getElementById('user-total');
const dealerCardsElement = document.getElementById('dealer-cards');
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
    deck = buildDeck();
    console.log(dealerCards);
    playAgainButton.style.display = 'none';
    dealerTotalElement.textContent = "Dealer's total: ";
    let userFirstCard = getRandomCard(deck);
    let userSecondCard = getRandomCard(deck);
    let dealerFirstCard = getRandomCard(deck);
    let dealerSecondCard = getRandomCard(deck);

    const testCard = document.createElement("div");
    testCard.classList.add("card", userFirstCard.suit.toLowerCase());
    testCard.innerHTML = 
    '<span class="card-value-suit top">' + userFirstCard.value + userFirstCard.entity + '</span>' + 
    '<span class="card-suit">' + userFirstCard.entity + '</span>' + 
    '<span class="card-value-suit bot">' + userFirstCard.value + userFirstCard.entity + '</span>';
    userCardsElement.appendChild(testCard);

    if (userFirstCard.value === 1 && userSecondCard.value === 1) {
        userFirstCard.value = 11;
        userSecondCard.value = 1;
        userHasPocketAce = true;
    } else if (userFirstCard.value === 1 || userSecondCard.value === 1) {
        userFirstCard.value === 1 ? userFirstCard.value = 11 : userSecondCard.value = 11;
        userHasPocketAce = true;
    }
    userCards = [userFirstCard.value, userSecondCard.value];
    userSum = userFirstCard.value + userSecondCard.value;
    if (dealerFirstCard.value === 1 || dealerFirstCard.value === 10) {
        dealerIsShowingPossibleBlackjack = true;
        dealerFirstCard.value === 1 ? dealerFirstCard.value = 11 : dealerFirstCard.value = 10;
    } 
    if (dealerFirstCard.value === 1 && dealerSecondCard.value === 1) {
        dealerIsShowingPossibleBlackjack = true;
        dealerFirstCard.value = 11;
        dealerSecondCard.value = 1;
    }
    dealerCards = [dealerFirstCard.value, dealerSecondCard.value];
    dealerSum = dealerFirstCard.value + dealerSecondCard.value;
    isUserAlive = true;
    if (userSum === 21) {
        hasBlackjack = true;
    }
    renderGame();
}

// function startGame() {
//     deck = buildDeck();
//     console.log(dealerCards);
//     playAgainButton.style.display = 'none';
//     dealerTotalElement.textContent = "Dealer's total: ";
//     let userFirstCard = getRandomCard(deck);
//     let userSecondCard = getRandomCard(deck);
//     let dealerFirstCard = getRandomCard(deck);
//     let dealerSecondCard = getRandomCard(deck);

//     const testCard = document.createElement("div");
//     testCard.classList.add("card", userFirstCard.cardSuit.toLowerCase());
//     testCard.innerHTML = 
//     '<span class="card-value-suit top">' + userFirstCard.cardValue + entity + '</span>' + 
//     '<span class="card-suit">' + entity + '</span>' + 
//     '<span class="card-value-suit bot">' + userFirstCard.cardValue + entity + '</span>';
//     document.body.appendChild(userFirstCard);

//     if (userFirstCard === 1 && userSecondCard === 1) {
//         userFirstCard = 11;
//         userSecondCard = 1;
//         userHasPocketAce = true;
//     } else if (userFirstCard === 1 || userSecondCard === 1) {
//         userFirstCard === 1 ? userFirstCard = 11 : userSecondCard = 11;
//         userHasPocketAce = true;
//     }
//     userCards = [userFirstCard, userSecondCard];
//     userSum = userFirstCard + userSecondCard;
//     if (dealerFirstCard === 1 || dealerFirstCard === 10) {
//         dealerIsShowingPossibleBlackjack = true;
//         dealerFirstCard === 1 ? dealerFirstCard = 11 : dealerFirstCard = 10;
//     } 
//     if (dealerFirstCard === 1 && dealerSecondCard === 1) {
//         dealerIsShowingPossibleBlackjack = true;
//         dealerFirstCard = 11;
//         dealerSecondCard = 1;
//     }
//     dealerCards = [dealerFirstCard, dealerSecondCard];
//     dealerSum = dealerFirstCard + dealerSecondCard;
//     isUserAlive = true;
//     if (userSum === 21) {
//         hasBlackjack = true;
//     }
//     renderGame();
// }

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
        let newCard = getRandomCard(deck);
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
    dealerCardsElement.textContent = "Dealer's cards: ";
        dealerCards.forEach( (card) => {
            dealerCardsElement.textContent += card + " ";
        });
        dealerTotalElement.textContent = "Dealer's total: " + dealerSum;
        if (dealerSum >= 17) {
            checkWinner();
        } else {
            if (dealerSum < 22) {
                setTimeout( function() {
                    let dealerNextCard = getRandomCard(deck);
                    dealerCards.push(dealerNextCard);
                    dealerSum += dealerNextCard;
                    if (dealerCards.includes(11) && dealerSum > 21) {
                        let dealerSum = checkForAceBust(dealerCards);
                    }
                    stay();
                }, 2000);
            }
        }
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
            stay();
            dealerHasBlackjack = true;
            gameMessageElement.textContent = "Sorry, dealer has Blackjack. You pushed.";
        } else if (dealerSum === 21) {
            stay();
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
    clearGame();
    // gameMessageElement.textContent = message;
}

function clearGame() {
    cards = [];
    userCards = [];
    dealerCards = [];
    userSum = 0;
    dealerSum = 0;
    isUserAlive = false;
    hasBlackjack = false;
    userHasPocketAce = false;
    dealerIsShowingPossibleBlackjack = false;
    gameButtons.style.display = 'none';
    playAgainButton.style.display = 'block';
}
