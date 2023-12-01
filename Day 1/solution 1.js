const fs = require('fs')
const input = fs.readFileSync('Day 1/input.txt', 'utf8').split('\n')

function extractNumbers (str) {
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