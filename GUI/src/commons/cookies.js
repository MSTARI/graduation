const setCookie = (name, value, day) => {
    let date = new Date();
    date.setTime(date.getTime() + day * 24 * 3600 * 1000);
    document.cookie = `${name}=${value};expires=${date}`;
}

const getCookie = name => {
    const cname = name + "=",
        coo = document.cookie.split(';');
    for (let i = 0; i < coo.length; i++) {
        let c = coo[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return '';
}

const clearCookie = name => {
    setCookie(name, '', -1);
}

export {
    setCookie,
    getCookie,
    clearCookie
}