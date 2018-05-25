import axios from 'axios';

const host = 'http://47.94.15.14:8080';

const getData = (url, params) => {
    return axios.get(host + url, params)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const postData = (url, data) => {
    return axios.post(host + url, data)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export {
    getData,
    postData
}