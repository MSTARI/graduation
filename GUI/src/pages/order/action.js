import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData, postData} from '../../commons/getData';

const laborData = () => (dispatch, getState) => { // 查询实验室数据
    getData('/laboratory_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

const openDialog = () => (dispatch, getState) => { // 打开搜索dialog
    dispatch(createAction(ActionType.DIALOG, {
        open: true
    }));
};

const closeDialog = () => (dispatch, getState) => { // 关闭搜索dialog
    dispatch(createAction(ActionType.DIALOG, {
        open: false
    }));
};

const openDetail = (detail, date, num) => (dispatch, getState) => { // 打开详情dialog
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: true,
        detail,
        date,
        num
    }));
};

const closeDetail = () => (dispatch, getState) => { // 关闭详情dialog
    dispatch(createAction(ActionType.DIALOG, {
        detailDia: false
    }));
};

const setInfo = (key, value) => (dispatch, getState) => { // 设置props
    dispatch(createAction(ActionType.SET, {
        [key]: value
    }));
};

const search = classroom => (dispatch, getState) => { // 搜索功能，页面中判断日期的显示
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

const getUser = () => (dispatch, getState) => { // 获取用户信息
    postData('/personInfo_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    userData: res
                }));
            }
        });
};

const addOrder = (admin, id, order1, classroom, order2) => (dispatch, getState) => { // 预约实验室
    const {classroom} = getState();
    if(admin) {
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

const cancelOrder = (classroom, order) => (dispatch, getState) => { // 管理员取消预约，强制取消预约需要自行发公告通知
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