import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

const userData = (id) => (dispatch, getState) => {
    postData('userInfo_api', {
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

const cancelOrder = (id, search) => (dispatch, getState) => {
    
};

export {
    userData,
    cancelOrder
};