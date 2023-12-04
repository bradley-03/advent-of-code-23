const fs = require('fs')
const input = fs.readFileSync('Day 4/input.txt', 'utf8').split('\n')

const cards = []
const cardPoints = []

function parseGame (game) {
    const unparsedWinNums = game.split('|')[0].split(":")[1].match(/\d+/g)
    const unparsedYourNums = game.split('|')[1].match(/\d+/g)

    const yourNumbers = []
    const winningNumbers = []
    
    for (let num of unparsedYourNums) {
        yourNumbers.push(Number(num))
    }
    for (let num of unparsedWinNums) {
        winningNumbers.push(Number(num))
    }

    return {yourNumbers, winningNumbers}
}

function checkCardValue (card) {
    let points = 0
    let winCount = 0

    for (let num of card.yourNumbers) {
        if (card.winningNumbers.includes(num)) {
            winCount++
        }
    }

    if (winCount > 0) {
        points++
        for (let i = 0; i < winCount-1; i++) {
            points = points*2
        }
    }
    
    return points
}

for (let line of input) {
    cards.push(parseGame(line))
}

for (let card of cards) {
    cardPoints.push(checkCardValue(card))
}

const totalPoints = cardPoints.reduce((a, b) => (a+b))
console.log(totalPoints)