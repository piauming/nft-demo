// dateString "2021-03-25"
export function convertToSolidityDate(dateString) {
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
}