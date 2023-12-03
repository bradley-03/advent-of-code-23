const fs = require('fs')
const input = fs.readFileSync('Day 2/input.txt', 'utf8').split('\n')

const maxValues = {
    red: 12,
    green: 13,
    blue: 14
}

function parseGame (game) {
    const id = Number(game.split(":")[0].split(" ")[1]) // split Game ID:
    
    const sets = []
    for (let set of game.split(":")[1].split(";")) {
        const splitSet = set.split(",")
        const setObj = {}

        for (let cubes of splitSet) {
            const splitCubes = cubes.trim().split(" ")
            setObj[splitCubes[1]] = Number(splitCubes[0])
        }
        sets.push(setObj)
    } 

    return {id, sets}
}

function checkSets (sets) {
    for (const set of sets) {
        for (const [key, value] of Object.entries(set)) {
            if (value > maxValues[key]) {
                return false
            }
        }
    }
    return true
}

let count = 0
for (let game of input) {
    const parsedGame = parseGame(game)

    if (checkSets(parsedGame.sets) == true) {
        count+= parsedGame.id
    }
}

console.log(count)