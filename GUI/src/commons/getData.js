import axios from 'axios';

const getData = url => {
    return axios.get(url)
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
    return axios.post(url)
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