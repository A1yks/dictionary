function getNextDayUnix() {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Math.floor(date.getTime() / 1000);
}

export default getNextDayUnix;
