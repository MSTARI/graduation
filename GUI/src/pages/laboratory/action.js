import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData} from '../../commons/getData';

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

const openDetail = detail => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: true,
        detail
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

export {
    laborData,
    openDialog,
    closeDialog,
    setClassroom,
    setStart,
    setEnd,
    searchData,
    openDetail,
    closeDetail
};