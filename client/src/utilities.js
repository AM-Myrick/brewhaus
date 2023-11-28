export const getLastNumberOfString = (str) => {
    const allNumbers = str.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
    return parseInt(allNumbers[allNumbers.length - 1], 10);
}