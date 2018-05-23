import {postData} from './getData';

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