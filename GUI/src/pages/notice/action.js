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
            } else {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: []
                }));
            }
        });
};

const addNew = (title, content) => (dispatch, getState) => {
    postData('/notice_api/add', {
        title,
        content,
        time: new Date().getTime()
    })
        .then(res => {
            if(res) {
                dispatch(noticeData());
            }
        });
};

const deleteNew = title => (dispatch, getState) => {
    postData('/notice_api/delete', {
        title
    })
        .then(res => {
            if(res) {
                dispatch(noticeData());
            }
        });
};

const openDetail = (title, content, time) => (dispatch, getState) => {
    dispatch(createAction(ActionType.OPENDIALOG, {
        detailDia: true,
        title,
        content,
        time
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
    deleteNew,
    openDetail,
    closeDetail,
    openAdd,
    closeAdd
};