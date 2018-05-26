import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

/**
 * 获取实验室数据
 */
const laborData = () => (dispatch, getState) => {
    getData('/laboratory_api')
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
 * 请求接口添加实验室信息
 * @param {String} name 
 * @param {Number} startTime 
 * @param {Number} endTime 
 * @param {Array} plan 
 */
const addLabor = (name, startTime, endTime, plan) => (dispatch, getState) => {
    postData('/laboratory_api/add', {
        name,
        startTime,
        endTime,
        plan
    })
        .then(res => {
            if(res) {
                dispatch(laborData());
            }
        });
};

/**
 * 请求接口修改实验室信息
 * @param {String} name 
 * @param {Number} start 
 * @param {Number} end 
 * @param {Array} plan 
 */
const modifyLabor = (name, start, end, plan) => (dispatch, getState) => {
    postData('/laboratory_api/modify', {
        name,
        start,
        end,
        plan
    })
        .then(res => {
            if(res) {
                dispatch(laborData());
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
 * 请求接口删除实验室数据
 * @param {String} name 
 */
const deleteLabor = name => (dispatch, getState) => {
    postData('/laboratory_api/delete', {
        name
    })
        .then(res => {
            if(res) {
                dispatch(laborData());
            }
        });
};

/**
 * 打开添加信息dialog
 */
const openAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: true
    }));
};

/**
 * 关闭添加信息dialog
 */
const closeAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: false
    }));
};

/**
 * 根据名称打开删除dialog
 * @param {String} name 
 */
const openDelete = name => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: true,
        name
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
 * 根据名称打开修改dialog，并传递信息
 * @param {String} name 
 * @param {Number} start 
 * @param {Number} end 
 */
const openModify = (name, start, end) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        modifyDia: true,
        name,
        start,
        end
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
    laborData,
    addLabor,
    modifyLabor,
    deleteLabor,
    openAdd,
    openDelete,
    openModify,
    closeAdd,
    closeDelete,
    closeModify,
    setInfo
};