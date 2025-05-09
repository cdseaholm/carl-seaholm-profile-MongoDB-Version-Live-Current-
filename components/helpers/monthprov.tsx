export async function MonthProv(monthsGiven: { month: number, year: number }[]) {
    let monthsReturned = [] as string[];
    let colorsReturned = [] as string[];
    if (monthsGiven === null) {
        return { monthNames: [] as string[], monthColors: [] as string[], message: "Month or year not provided" }
    } else {
        for (let i = 0; i < monthsGiven.length; i++) {
            let thisMonth = monthsGiven[i].month as number;
            if (thisMonth < 0 || thisMonth > 11) {
                return { monthNames: [] as string[], monthColors: [] as string[], message: "Month must be between 0 and 11" }
            } else if (monthsGiven === undefined) {
                return { monthNames: [] as string[], monthColors: [] as string[], message: "Month or year not provided" }
            } else {
                let monthName = '';
                let monthColor = '';
                let yearToUse = monthsGiven[i].year.toString().slice(2, 4);
                switch (thisMonth) {
                    case 0:
                        monthName = `Jan, ${yearToUse}`;
                        monthColor = '#2F5C8F'; // Deep winter blue
                        break;
                    case 1:
                        monthName = `Feb, ${yearToUse}`;
                        monthColor = '#C41E3A'; // Valentine's red
                        break;
                    case 2:
                        monthName = `Mar, ${yearToUse}`;
                        monthColor = '#3B7A57'; // Spring forest green
                        break;
                    case 3:
                        monthName = `Apr, ${yearToUse}`;
                        monthColor = '#E6B800'; // Daffodil yellow
                        break;
                    case 4:
                        monthName = `May, ${yearToUse}`;
                        monthColor = '#FF7B9C'; // Spring blossom pink
                        break;
                    case 5:
                        monthName = `Jun, ${yearToUse}`;
                        monthColor = '#4F86F7'; // Summer sky blue
                        break;
                    case 6:
                        monthName = `Jul, ${yearToUse}`;
                        monthColor = '#DE3831'; // Patriotic red
                        break;
                    case 7:
                        monthName = `Aug, ${yearToUse}`;
                        monthColor = '#F28C28'; // Late summer orange
                        break;
                    case 8:
                        monthName = `Sep, ${yearToUse}`;
                        monthColor = '#B76E79'; // Muted rose (back to school)
                        break;
                    case 9:
                        monthName = `Oct, ${yearToUse}`;
                        monthColor = '#CF5300'; // Halloween orange
                        break;
                    case 10:
                        monthName = `Nov, ${yearToUse}`;
                        monthColor = '#8B4513'; // Autumn brown
                        break;
                    case 11:
                        monthName = `Dec, ${yearToUse}`;
                        monthColor = '#154734'; // Holiday green
                        break;
                }
                monthsReturned.push(monthName);
                colorsReturned.push(monthColor);
            }
        }
    }
    return { monthNames: monthsReturned, monthColors: colorsReturned, message: 'Success' } as { monthNames: string[], monthColors: string[], message: string };
}