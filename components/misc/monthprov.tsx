export default function MonthProv(monthGiven: number, yearGiven: number) {

    if (monthGiven === null || yearGiven === null) {
        return console.log("Month or year not provided")
    } else if (monthGiven < 0 || monthGiven > 11) {
        return console.log("Month must be between 0 and 11")
    } else if (monthGiven === undefined || yearGiven === undefined) {
        return console.log("Month or year not provided")
    } else {
        let monthTuple;
        if (monthGiven === 0) {
            monthTuple = [`January, ${yearGiven}`, `Light Blue`]
        } else if (monthGiven === 1) {
            monthTuple = [`February, ${yearGiven}`, `Pink`]
        } else if (monthGiven === 2) {
            monthTuple = [`March, ${yearGiven}`, `Purple`]
        } else if (monthGiven === 3) {
            monthTuple = [`April, ${yearGiven}`, `Green`]
        } else if (monthGiven === 4) {
            monthTuple = [`May, ${yearGiven}`, `Purple`]
        } else if (monthGiven === 5) {
            monthTuple = [`June, ${yearGiven}`, `Orange`]
        } else if (monthGiven === 6) {
            monthTuple = [`July, ${yearGiven}`, `Blue`]
        } else if (monthGiven === 7) {
            monthTuple = [`August, ${yearGiven}`, `Orange`]
        } else if (monthGiven === 8) {
            monthTuple = [`September, ${yearGiven}`, `Rust`]
        } else if (monthGiven === 9) {
            monthTuple = [`October, ${yearGiven}`, `Maroon`]
        } else if (monthGiven === 10) {
            monthTuple = [`November, ${yearGiven}`, `Brown`]
        } else if (monthGiven === 11) {
            monthTuple = [`December, ${yearGiven}`, `Red`]
        }


        return (
            monthTuple
        )
    }
}