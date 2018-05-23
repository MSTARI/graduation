import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {postData} from '../../commons/getData';

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

const openDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.UPDATEPASSWORD, {
        open: true
    }));
};

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