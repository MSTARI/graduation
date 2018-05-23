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
            }
        });
};

const openDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: true
    }));
};

const closeDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: false
    }));
};

const setClassroom = classroom => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        classroom
    }));
};

const setStart = start => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        start
    }));
};

const setEnd = end => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        end
    }));
};

const openDetail = (detail, date, num) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: true,
        detail,
        date,
        num
    }));
};

const closeDetail = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: false
    }));
};

const searchData = classroom => (dispatch, getState) => {
    getData('/laboratory_api/search', {
        params: {
            name: classroom
        }
    })
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    searchData: res
                }));
            }
        });
};

const getUser = () => (dispatch, getState) => {
    postData('/userInfo_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    userData: res
                }));
            }
        });
};

const addOrder = (id, order1, classroom, order2) => (dispatch, getState) => {
    postData('/userInfo_api/addOrder', {
        id,
        order: order1
    });
    postData('/laboratory_api/update', {
        classroom,
        order: order2
    })
        .then(res => {
            if(res) {
                dispatch(searchData());
            }
        });
};

export {
    laborData,
    openDialog,
    closeDialog,
    setClassroom,
    setStart,
    setEnd,
    searchData,
    openDetail,
    closeDetail,
    getUser,
    addOrder
};