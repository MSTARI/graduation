import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

/**
 * 获取公告数据
 */
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

/**
 * 添加新公告
 * @param {String} title 
 * @param {String} content 
 */
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

/**
 * 删除公告
 * @param {String} title 
 */
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

/**
 * 打开公告详情，设置信息
 * @param {String} title 
 * @param {String} content 
 * @param {Number} time 
 */
const openDetail = (title, content, time) => (dispatch, getState) => {
    dispatch(createAction(ActionType.OPENDIALOG, {
        detailDia: true,
        title,
        content,
        time
    }));
};

/**
 * 关闭公告详情dialog
 */
const closeDetail = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.CLOSEDIALOG, {
        detailDia: false
    }));
};

/**
 * 打开添加dialog
 */
const openAdd = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.OPENDIALOG, {
        addDia: true
    }));
};

/**
 * 关闭添加dialog
 */
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