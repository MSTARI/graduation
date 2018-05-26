import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {postData} from '../../commons/getData';

/**
 * 获取用户数据
 */
const userData = () => (dispatch, getState) => {
    postData('/personInfo_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

/**
 * 请求接口修改密码
 * @param {String} id 
 * @param {String} password 
 */
const updatePassword = (id, password) => (dispatch, getState) => {
    postData('/personInfo_api/update', {
        id,
        password
    })
        .then(res => {
            if(res) {
                dispatch(userData());
            }
        });
};

/**
 * 打开修改密码dialog
 */
const openDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.UPDATEPASSWORD, {
        open: true
    }));
};

/**
 * 关闭修改密码dialog
 */
const closeDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.UPDATEPASSWORD, {
        open: false
    }));
};

export {
    userData,
    openDialog,
    closeDialog,
    updatePassword
};