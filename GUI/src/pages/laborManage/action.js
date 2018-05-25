import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

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

const setInfo = (key, value) => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        [key]: value
    }));
};

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

const openDelete = name => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: true,
        name
    }));
};

const closeDelete = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        deleteDia: false
    }));
};

const openModify = (name, start, end) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        modifyDia: true,
        name,
        start,
        end
    }));
};

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