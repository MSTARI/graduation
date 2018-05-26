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
            } else {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: []
                }));
            }
        });
};

/**
 * 请求接口添加用户数据
 * @param {String} id 
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 * @param {String} address 
 * @param {Number} authority 
 */
const addUser = (id, name, email, phone, address, authority) => (dispatch, getState) => {
    if(authority) {
        postData('/personInfo_api/add', {
            id,
            name,
            email,
            phone,
            address,
            authority
        })
            .then(res => {
                if(res) {
                    dispatch(userData());
                }
            });
    } else {
        postData('/personInfo_api/add', {
            id,
            name,
            email,
            phone,
            address,
            authority,
            order: []
        })
            .then(res => {
                if(res) {
                    dispatch(userData());
                }
            });
    }
};

/**
 * 修改用户信息
 * @param {String} id 
 * @param {Object} info 
 */
const modifyUser = (id, info) => (dispatch, getState) => {
    postData('/personInfo_api/modify', {
        id,
        info
    })
        .then(res => {
            if(res) {
                dispatch(userData());
            }
        });
};

/**
 * 设置Props
 * @param {String} key 
 * @param {String} value 
 */
const setInfo = (key, value) => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        [key]: value
    }));
};

/**
 * 删除用户信息
 * @param {String} id 
 */
const deleteUser = id => (dispatch, getState) => {
    postData('/personInfo_api/delete', {
        id
    })
        .then(res => {
            if(res) {
                dispatch(userData());
            }
        });
};

/**
 * 打开添加dialog
 */
const openAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: true
    }));
};

/**
 * 关闭添加dialog
 */
const closeAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: false
    }));
};

/**
 * 打开删除dialog
 */
const openDelete = id => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: true,
        id
    }));
};

/**
 * 关闭删除dialog
 */
const closeDelete = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: false
    }));
};

/**
 * 打开修改dialog，并设置携带信息
 */
const openModify = (id, name, email, phone, address, authority) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        modifyDia: true,
        id,
        name,
        email,
        phone,
        address,
        authority
    }));
};

/**
 * 关闭修改dialog
 */
const closeModify = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        modifyDia: false
    }));
};

export {
    userData,
    addUser,
    modifyUser,
    deleteUser,
    openAdd,
    openDelete,
    openModify,
    closeAdd,
    closeDelete,
    closeModify,
    setInfo
};