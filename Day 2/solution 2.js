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
    const minCounts = {
        red: 0,
        green: 0,
        blue: 0,
    }

    for (const set of sets) {
        for (const [key, value] of Object.entries(set)) {
            if (value > minCounts[key]) {
                minCounts[key] = value
            }
        }
    }

    return minCounts["red"] * minCounts["green"] * minCounts["blue"]
}

let count = 0
for (let game of input) {
    const parsedGame = parseGame(game)

    count += checkSets(parsedGame.sets)
}

console.log(count)