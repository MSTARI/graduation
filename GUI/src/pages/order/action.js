import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

/**
 * 查询实验室数据
 */
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

/**
 * 打开搜索dialog
 */
const openDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: true
    }));
};

/**
 * 关闭搜索dialog
 */
const closeDialog = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        open: false
    }));
};

/**
 * 打开详情dialog，并且设置数据
 * @param {Object} detail 
 * @param {Number} date 
 * @param {Number} num 
 */
const openDetail = (detail, date, num) => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: true,
        detail,
        date,
        num
    }));
};

/**
 * 关闭详情dialog
 */
const closeDetail = () => (dispatch, getState) => {
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: false
    }));
};

/**
 * 设置Props
 * @param {String} key 
 * @param {String} value 
 */
const setInfo = (key, value) => (dispatch, getState) => {
    dispatch(createAction(ActionType.SET, {
        [key]: value
    }));
};

/**
 * 搜索功能，页面中判断日期的显示
 * @param {String} classroom 
 */
const search = classroom => (dispatch, getState) => {
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

/**
 * 获取用户信息
 */
const getUser = () => (dispatch, getState) => {
    postData('/personInfo_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    userData: res
                }));
            }
        });
};

/**
 * 预约实验室
 * @param {String} admin 
 * @param {String} id 
 * @param {Object} order1 
 * @param {String} classroom 
 * @param {Object} order2 
 */
const addOrder = (admin, id, order1, classroom, order2) => (dispatch, getState) => {
    const {classroom} = getState();
    if(admin === 'true') {
        postData('/laboratory_api/update', {
            classroom,
            order: order2
        })
            .then(res => {
                if(res) {
                    dispatch(search(classroom));
                }
            });
    } else {
        postData('/personInfo_api/addOrder', {
            id,
            order: order1
        });
        postData('/laboratory_api/update', {
            classroom,
            order: order2
        })
            .then(res => {
                if(res) {
                    dispatch(search(classroom));
                }
            });
    }
};

/**
 * 管理员取消预约，强制取消预约需要自行发公告通知
 * @param {String} classroom 
 * @param {Object} order 
 */
const cancelOrder = (classroom, order) => (dispatch, getState) => {
    const {classroom} = getState();
    postData('/laboratory_api/update', {
        classroom,
        order
    })
        .then(res => {
            if(res) {
                dispatch(search(classroom));
            }
        });
};

export {
    laborData,
    openDialog,
    closeDialog,
    setInfo,
    search,
    openDetail,
    closeDetail,
    getUser,
    addOrder,
    cancelOrder
};