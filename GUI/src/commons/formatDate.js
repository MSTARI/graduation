const formatDate = value => {
    const date = new Date(value);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    if(month < 10) {
        month = `0${month}`;
    }
    if(day < 10) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

export default formatDate;