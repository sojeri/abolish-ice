const { addDays, subDays, subMonths } = require('date-fns')

/**
 * calculateDates generates the dates required for commits to replace/update
 * the GH graph beginning about 10 months before today.
 */
function calculateDates() {
    // start 10 months ago
    let startDate = subMonths(new Date(), 10)

    // ensure startDate is Tuesday
    while (startDate.getUTCDay() != 2) {
        startDate = subDays(startDate, 1)
    }

    let abolishIcePixels = [
        // A
        0,1,1,1,3,2,6,1,1,1,
        // B
        10,1,1,1,1,3,2,2,4,2,
        // O
        12,1,1,4,4,4,1,1,
        // L
        11,1,1,1,1,7,7,
        // I
        10,4,3,1,1,1,1,3,4,
        // S
        11,3,3,2,2,3,3,
        // H
        11,1,1,1,1,5,5,1,1,1,1,
        //
        // I
        38,4,3,1,1,1,1,3,4,
        // C
        11,1,1,4,4,3,4,
        // E
        10,1,1,1,1,3,2,2,3,2,2
    ]

    let datesTxt = ''

    for (let i = 0; i < abolishIcePixels.length; i++) {
        let nextPointLoc = abolishIcePixels[i]
        startDate = addDays(startDate, nextPointLoc)
        datesTxt += `${ startDate.toISOString().split('T')[0] }\n`
    }

    return datesTxt
}

module.exports = { calculateDates }