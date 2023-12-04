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

// similar process for symbols, but only include the index as the actual symbol is
// not required
for (let line of input) {
    const syms = "*$%&/=-#@+"
    const output = []

    for (let char = 0; char < line.length; char++) {
        if (syms.includes(line[char])) {
            output.push(char)
        }
    }
    
    symbols.push(output)
}

// find valid numbers by checking if a symbol is adjacent
function checkAdjacent (lineIndex, index, num) {
    index = Number(index)

    // check both sides of num
    if (symbols[lineIndex].includes(index - 1)) {
        return true
    } else if (symbols[lineIndex].includes(index + num.length)) {
        return true
    }
 
    for (let digit = index; digit < index + num.length; digit++) {
        // above
        if (symbols[lineIndex - 1]) {
            if (symbols[lineIndex - 1].includes(digit)) {
                return true
            } else if (symbols[lineIndex - 1].includes(digit - 1)) {
                return true
            } else if (symbols[lineIndex - 1].includes(digit + 1)) {
                return true
            }
        }
        // below
        if (symbols[lineIndex + 1]) {
            if (symbols[lineIndex + 1].includes(digit)) {
                return true
            } else if (symbols[lineIndex + 1].includes(digit - 1)) {
                return true
            } else if (symbols[lineIndex + 1].includes(digit + 1)) {
                return true
            }
        }
    }   
    return false
}

let count = 0
for (let [lineIndex, line] of numbers.entries()) {
    for (const [index, num] of Object.entries(line)) {
        if (checkAdjacent(lineIndex, index, num) == true) {
            count += Number(num)
        }
    }
}

console.log(`FINAL COUNT: ${count}`)