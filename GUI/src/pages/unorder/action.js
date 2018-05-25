import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

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

const openDia = (id, order1, order2) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: true,
        id,
        order1,
        order2
    }));
};

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