import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

/**
 * 获取用户数据
 * @param {String} id 
 */
const userData = id => (dispatch, getState) => {
    postData('/personInfo_api', {
        id
    })
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

/**
 * 获取实验室数据
 */
const laborData = () => (dispatch, getState) => {
    getData('/laboratory_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    allData: res
                }));
            }
        });
};

/**
 * 取消预约，个人预约和实验室预约
 * @param {String} id 
 * @param {Object} order1 
 * @param {Object} order2 
 */
const cancelOrder = (id, order1, order2) => (dispatch, getState) => {
    postData('/personInfo_api/deleteOrder', {
        id,
        order: order1
    });
    postData('/laboratory_api/cancel', {
        order: order2
    })
        .then(res => {
            if(res) {
                dispatch(userData(id));
            }
        });
};

/**
 * 打开取消预约dialog，并设置信息
 * @param {String} id 
 * @param {Object} order1 
 * @param {Object} order2 
 */
const openDia = (id, order1, order2) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: true,
        id,
        order1,
        order2
    }));
};

/**
 * 关闭dialog
 */
const closeDia = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: false
    }));
};

export {
    userData,
    cancelOrder,
    laborData,
    openDia,
    closeDia
};