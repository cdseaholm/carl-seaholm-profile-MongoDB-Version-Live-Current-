import { th } from "date-fns/locale";

export async function MonthProv(monthsGiven: number[], yearGiven: number) {

    let monthsReturned = [] as string[];
    let colorsReturned = [] as string[];
    let monthsTuple = [monthsReturned, colorsReturned]
    if (monthsGiven === null || yearGiven === null) {
        return console.log("Month or year not provided")
    } else {
        for (let i = 0; i < monthsGiven.length; i++) { 
            if (monthsGiven[i] < 0 || monthsGiven[i] > 11) {
                return console.log("Month must be between 0 and 11")
            } else if (monthsGiven === undefined || yearGiven === undefined) {
                return console.log("Month or year not provided")
            } else {
                let thisMonth = '';
                let thisColor = ''
                let yearToUse = yearGiven.toString().slice(2, 4);
                if (monthsGiven[i] === 0) {
                    thisMonth = `Jan, ${yearToUse}`;
                    thisColor = `Light Blue`;
                } else if (monthsGiven[i] === 1) {
                    thisMonth = `Feb, ${yearToUse}`; 
                    thisColor = `Pink`;
                } else if (monthsGiven[i] === 2) {
                    thisMonth = `Mar, ${yearToUse}`;
                    thisColor = `Purple`;
                } else if (monthsGiven[i] === 3) {
                    thisMonth = `Apr, ${yearToUse}`;
                    thisColor = `Green`;
                } else if (monthsGiven[i] === 4) {
                    thisMonth = `May, ${yearToUse}`;
                    thisColor = `Purple`;
                } else if (monthsGiven[i] === 5) {
                    thisMonth = `June, ${yearToUse}`;
                    thisColor = `Orange`;
                } else if (monthsGiven[i] === 6) {
                    thisMonth = `July, ${yearToUse}`;
                    thisColor = `Blue`;
                } else if (monthsGiven[i] === 7) {
                    thisMonth = `Aug, ${yearToUse}`;
                    thisColor = `Orange`;
                } else if (monthsGiven[i] === 8) {
                    thisMonth = `Sept, ${yearToUse}`;
                    thisColor = `Rust`;
                } else if (monthsGiven[i] === 9) {
                    thisMonth = `Oct, ${yearToUse}`;
                    thisColor = `Maroon`;
                } else if (monthsGiven[i] === 10) {
                    thisMonth = `Nov, ${yearToUse}`;
                    thisColor = `Brown`;
                } else if (monthsGiven[i] === 11) {
                    thisMonth = `Dec, ${yearToUse}`;
                    thisColor = `Red`;
                }
                monthsReturned.push(thisMonth);
                colorsReturned.push(thisColor);
            }
        }
        const monthNames = monthsReturned.map((month) => {
            return month;
        });
        const monthColors = colorsReturned.map((color) => {
            return color;
        });


        return { monthNames, monthColors };
    }
}