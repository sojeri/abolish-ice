#!/usr/bin/env node

const fs = require('fs')
const { resetDefaultBranch } = require('./src/resetDefaultBranch')
const { calculateDates } = require('./src/calculateDates')

function main() {
    // handle args
    let args = process.argv
    let isVerbose = args.indexOf('--verbose') > -1 || args.indexOf('-v') > -1
    if (isVerbose) { console.log('running in verbose mode') }

    let shouldStopAfterCalc = args.indexOf('--calc') > -1 || args.indexOf('-c') > -1
    if (isVerbose && shouldStopAfterCalc) { console.log('running in calc only mode') }


    let abolishIcePixels = calculateDates(isVerbose)

    fs.unlinkSync('pixels.txt')

    fs.writeFile(
        'pixels.txt',
        abolishIcePixels,
        function (err) {
            if (err) throw err
        })

    if (isVerbose) { console.log('finished calculating new ABOLISH ICE pixel dates')}
    if (shouldStopAfterCalc) {
        return
    }
    
    resetDefaultBranch(isVerbose)
    // if make it this far sans errors, should just run paint.sh?
    // if so, log warning that it may take 5-20min depending on machine.

    console.log('finished resetting state. safe to run `./paint.sh` now.')
}

main()