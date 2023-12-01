const fs = require('fs')
const input = fs.readFileSync('Day 1/input.txt', 'utf8').split('\n')

const numberValues = {
    "one": "o1e",
    "two": "t2o",
    "three": "thr3e",
    "four": "fo4r",
    "five": "f5ve",
    "six": "s6x",
    "seven": "se7en",
    "eight": "ei8ght",
    "nine": "n9ne"
}

function extractNumbers (str) {
    for (let key in numberValues) {
        str = str.replaceAll(key, numberValues[key])
    }
    return str.match(/\d+/g).join('')
}

let count = 0
for (let value of input) {
    const valNums = extractNumbers(value)
    const firstNumber = valNums[0]
    const lastNumber = valNums[valNums.length - 1]

    const twoDigitNum = Number(`${firstNumber}${lastNumber}`)
    count += twoDigitNum
}

console.log(count)