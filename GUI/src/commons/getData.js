import axios from 'axios';

const host = 'http://47.94.15.14:8080'; // 服务器地址

/**
 * 利用get方式请求数据
 * @param {String} url 
 * @param {Object} params 
 */
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

/**
 * 利用post方式请求数据
 * @param {String} url 
 * @param {Object} data 
 */
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