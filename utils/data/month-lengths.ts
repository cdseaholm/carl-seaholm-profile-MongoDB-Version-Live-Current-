export async function GetMonthLength(month: number, year: number): Promise<number> {
    const monthLength = new Date(year, month, 0).getDate();
    return monthLength;
}