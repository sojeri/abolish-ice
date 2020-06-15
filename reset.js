#!/usr/bin/env node

const fs = require('fs')
const { resetDefaultBranch } = require('./src/resetDefaultBranch')
const { calculateDates } = require('./src/calculateDates')

function main() {
    let abolishIcePixels = calculateDates()

    fs.unlinkSync('pixels.txt')

    fs.writeFile(
        'pixels.txt',
        abolishIcePixels,
        function (err) {
            if (err) throw err
        })

    resetDefaultBranch()

    // if make it this far sans errors, should just run paint.sh?
    // if so, log warning that it may take 5-20min depending on machine.
}

main()