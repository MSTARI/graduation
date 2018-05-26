import {postData} from './getData';

/**
 * 获取用户信息
 */
const userData = () => {
    return postData('/personInfo_api')
        .then(res => {
            if(res.length) {
                return res;
            } else {
                return false;
            }
        });
};

/**
 * 通过对比用户列表信息，验证登录用户是否是管理员
 * @param {String} id 
 */
const verifyAdmin = id => {
    return userData()
        .then(res => {
            if(res) {
                let result = false;
                res.forEach(item => {
                    if(item.id === id) {
                        if(item.authority === 1) {
                            result = true;
                        } else {
                            result = false;
                        }
                    }
                });
                return result;
            }
        });
};

export default verifyAdmin;