$('document').ready(function() {
    displayInitialDeck()
    // $('.newGame').on('click', flushDecks);
    // $('.restart-btn').on('click', restartGame);
    // //   $('.hint-btn').on('click', hintClicked);
    // $('.close-btn').on('click', closeMask);
    // $('.new-game-confirm-btn').on('click', confirmNewGame);
})
const underDecks = [[], [], [], [], [], [], [], []]
let defaultCard = [1, 2, 14, 15, 27, 28, 40, 41]
function shuffle(array) {
    for (let i = array - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
function newCards() {
    //新建一個長度52的undefined陣列，參數第一個為內容，第二個為index序，將index序＋1後放回去
    let newCardDeck = Array.from({ length: 52 }, (_, k) => k + 1)
    let shuffleCardDeck = shuffle(newCardDeck) //把1~52順序的數字洗亂
    for (let i = 0; i < defaultCard.length; i++) {
        //抽出預設的牌
        let index = shuffleCardDeck.indexOf(defaultCard[i])
        shuffleCardDeck.splice(index, 1)
    }
    // 分 6,6,6,6,5,5,5,5張放入八個牌堆內 0~5 6~11 12~17 18~23 24~28.........
    for (let i = 0; i <= 7; i++) {
        if (i <= 3) {
            underDecks[i] = shuffleCardDeck.splice(0, 6)
        } else {
            underDecks[i] = shuffleCardDeck.splice(0, 5)
        }
    }
    console.log(underDecks)
}

newCards()
let unOrderDeck = document.getElementById('un-order-decks')
unOrderDeck.style.display = 'flex'
unOrderDeck.style.justifyContent = 'space-around'
function displayInitialDeck() {
    underDecks.forEach((decks, index) => {
        const unOrderDecksElem = document.createElement('div')
        unOrderDecksElem.id = `un-order-dock-${index}`
        unOrderDecksElem.style.position = 'relative'

        unOrderDecksElem.style.height = '600px'
        unOrderDecksElem.style.width = '152px'
        // unOrderDecksElem.style.fontsize = '16px'
        // unOrderDecksElem.style.userSelect = 'none'
        decks.forEach((card, cardIndex) => {
            console.log(card)
            const unOrderDeckCardElem = document.createElement('div')
            // if(!isGamePause && cardIndex +1 === decks.length){
            //   unOrderDeckCardElem.draggable = true;
            // }
            unOrderDeckCardElem.draggable = true
            unOrderDeckCardElem.style.position = 'absolute'
            unOrderDeckCardElem.style.height = '213px'
            unOrderDeckCardElem.style.width = '100%'
            unOrderDeckCardElem.className = `underDeck-0`
            // unOrderDeckCardElem.style.border = '1px solid #c9c9c9'
            unOrderDeckCardElem.style.color = 'white'
            unOrderDeckCardElem.style.top = '40px'
            unOrderDeckCardElem.innerHTML = `
                <div>
                <div style='display:flex;align-items:center'>
                <span>${transNumberToEnglish(card % 13)}</span><img style='margin-left:2px;width:162px;height:219px'
                src='./image/card/${transNumberToColor(card)}_${transNumberToEnglish(card % 13)}@2x.png'>
                </div>
                </div>`
            unOrderDecksElem.appendChild(unOrderDeckCardElem)
        })
        unOrderDeck.appendChild(unOrderDecksElem)
    })
}
function createRandomDeckNum() {
    const randomNum = Math.floor(Math.random() * (7 - 0 + 1)) + 0

    if (randomNum <= 3) {
        if (underDecks[randomNum].length >= 6) {
            return createRandomDeckNum()
        }
    } else {
        if (underDecks[randomNum].length >= 5) {
            return createRandomDeckNum()
        }
    }
    return randomNum
}

//取得un-order-decks
let theInit = false

function transNumberToColor(cardNumber) {
    ///黑桃 (1-13) || 紅心 (14-26) || 磚塊 (27-39) || 梅花 (40-52)
    if (cardNumber > 0 && cardNumber <= 13) return 'spade'
    if (cardNumber > 13 && cardNumber <= 26) return 'heart'
    if (cardNumber > 27 && cardNumber <= 39) return 'diamond'
    if (cardNumber > 40 && cardNumber <= 52) return 'club'
}
function transNumberToEnglish(cardNumber) {
    ///黑桃 (1-13) || 紅心 (14-26) || 磚塊 (27-39) || 梅花 (40-52)
    switch (cardNumber) {
        case 0:
            return 'K'
        case 1:
            return 'A'
        case 11:
            return 'J'
        case 12:
            return 'Q'
    }
    return cardNumber
}
