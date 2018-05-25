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
            } else {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: []
                }));
            }
        });
};

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

const setInfo = (key, value) => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        [key]: value
    }));
};

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

const openAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: true
    }));
};

const closeAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        addDia: false
    }));
};

const openDelete = id => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: true,
        id
    }));
};

const closeDelete = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: false
    }));
};

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