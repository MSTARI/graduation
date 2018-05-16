const setCookie = (name, value, day) => {
    const timestamp = new Date().getTime();
    document.cookie = `${name}=${value};expires=${timestamp + day * 24 * 3600 * 1000}`;
}

const getCookie = name => {
    var cname = name + "=";
    const coo = document.cookie.split(';');
    for (let i = 0; i < coo.length; i++) {
        let c = coo[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return '';
}

export {
    setCookie,
    getCookie
}