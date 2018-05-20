import axios from 'axios';

const getData = (url, params) => {
    return axios.get(url, params)
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
    return axios.post(url, data)
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