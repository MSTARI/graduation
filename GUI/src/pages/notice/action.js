import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

const noticeData = () => (dispatch, getState) => {
    getData('/notice_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

const addNew = (title, content) => (dispatch, getState) => {
    postData('/notice_api/add', {
        title,
        content
    })
        .then(res => {
            if(res) {
                dispatch(noticeData());
            }
        });
};

const openDetail = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.OPENDIALOG, {
        detailDia: true
    }));
};

const closeDetail = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.CLOSEDIALOG, {
        detailDia: false
    }));
};

const openAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.OPENDIALOG, {
        addDia: true
    }));
};

const closeAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.CLOSEDIALOG, {
        addDia: false
    }));
};

export {
    noticeData,
    addNew,
    openDetail,
    closeDetail,
    openAdd,
    closeAdd
};