export async function MonthProv(monthsGiven: number[], yearGiven: number) {
    let monthsReturned = [] as string[];
    let colorsReturned = [] as string[];
    if (monthsGiven === null || yearGiven === null) {
        return console.log("Month or year not provided");
    } else {
        for (let i = 0; i < monthsGiven.length; i++) {
            let thisMonth = monthsGiven[i] as number;
            if (thisMonth < 0 || thisMonth > 11 || !thisMonth) {
                return console.log("Month must be between 0 and 11");
            } else if (monthsGiven === undefined || yearGiven === undefined) {
                return console.log("Month or year not provided");
            } else {
                let thisMonth = '';
                let thisColor = '';
                let yearToUse = yearGiven.toString().slice(2, 4);
                switch (monthsGiven[i]) {
                    case 0:
                        thisMonth = `Jan, ${yearToUse}`;
                        thisColor = `#ADD8E6`; // Light Blue
                        break;
                    case 1:
                        thisMonth = `Feb, ${yearToUse}`;
                        thisColor = `#FF69B4`; // Light Pink
                        break;
                    case 2:
                        thisMonth = `Mar, ${yearToUse}`;
                        thisColor = `#90EE90`; // Light Green
                        break;
                    case 3:
                        thisMonth = `Apr, ${yearToUse}`;
                        thisColor = `#FFFACD`; // Light Yellow
                        break;
                    case 4:
                        thisMonth = `May, ${yearToUse}`;
                        thisColor = `#9370DB`; // Light Purple
                        break;
                    case 5:
                        thisMonth = `June, ${yearToUse}`;
                        thisColor = `#FF7F50`; // Coral
                        break;
                    case 6:
                        thisMonth = `July, ${yearToUse}`;
                        thisColor = `#87CEEB`; // Sky Blue
                        break;
                    case 7:
                        thisMonth = `Aug, ${yearToUse}`;
                        thisColor = `#FFDAB9`; // Peach
                        break;
                    case 8:
                        thisMonth = `Sept, ${yearToUse}`;
                        thisColor = `#FFD700`; // Gold
                        break;
                    case 9:
                        thisMonth = `Oct, ${yearToUse}`;
                        thisColor = `#FFA500`; // Orange
                        break;
                    case 10:
                        thisMonth = `Nov, ${yearToUse}`;
                        thisColor = `#800000`; // Maroon
                        break;
                    case 11:
                        thisMonth = `Dec, ${yearToUse}`;
                        thisColor = `#FF4500`; // Red
                        break;
                }
                monthsReturned.push(thisMonth);
                colorsReturned.push(thisColor);
            }
        }
        return { monthNames: monthsReturned, monthColors: colorsReturned };
    }
}