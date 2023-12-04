const fs = require('fs')
const input = fs.readFileSync('Day 3/input.txt', 'utf8').split('\n')

const symbols = []
const numbers = []

// for every line, create an object containing its number
for (let line of input) {
    const nums = line.match(/\d+/g)
    const output = {}

    if (nums) {
        for (let num of nums) {
            const index = line.indexOf(num)
            line = line.replace(num, new Array(num.length + 1).join("."))
            output[index] = num
        }
    }

    numbers.push(output)
}

for (let line of input) {
    const syms = "*$%&/=-#@+"
    const output = {}

    for (let char = 0; char < line.length; char++) {
        if (syms.includes(line[char])) {
            output[char] = {nums: [], symbol: line[char]}
        }
    }
    
    symbols.push(output)
}

// find valid numbers by checking if a symbol is adjacent
function checkAdjacent (lineIndex, index, num) {
    index = Number(index)

    // check both sides of num
    if (symbols[lineIndex][index - 1] !== undefined) {
        symbols[lineIndex][index - 1]["nums"].push(num)
        return true
    } else if (symbols[lineIndex][index + num.length] !== undefined) {
        symbols[lineIndex][index + num.length]["nums"].push(num)
        return true
    }
 
    for (let digit = index; digit < index + num.length; digit++) {
        // above
        if (symbols[lineIndex - 1]) {
            if (symbols[lineIndex - 1][digit] !== undefined) {
                symbols[lineIndex - 1][digit]["nums"].push(num)
                return true
            } else if (symbols[lineIndex - 1][digit - 1] !== undefined) {
                symbols[lineIndex - 1][digit - 1]["nums"].push(num)
                return true
            } else if (symbols[lineIndex - 1][digit + 1] !== undefined) {
                symbols[lineIndex - 1][digit + 1]["nums"].push(num)
                return true
            }
        }
        // below
        if (symbols[lineIndex + 1]) {
            if (symbols[lineIndex + 1][digit] !== undefined) {
                symbols[lineIndex + 1][digit]["nums"].push(num)
                return true
            } else if (symbols[lineIndex + 1][digit - 1] !== undefined) {
                symbols[lineIndex + 1][digit - 1]["nums"].push(num)
                return true
            } else if (symbols[lineIndex + 1][digit + 1] !== undefined) {
                symbols[lineIndex + 1][digit + 1]["nums"].push(num)
                return true
            }
        }
    }   
    return false
}

for (let [lineIndex, line] of numbers.entries()) {
    for (const [index, num] of Object.entries(line)) {
        checkAdjacent(lineIndex, index, num)
    }
}

let count = 0
for (let line of symbols) {
    for (let [index, symbol] of Object.entries(line)) {
        if (symbol.nums.length === 2 && symbol.symbol === "*") {
            count += symbol.nums[0] * symbol.nums[1]
        }
    }

}

console.log(`FINAL COUNT: ${count}`)