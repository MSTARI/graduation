import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // 用户信息数据
    allData: [], // 实验室数据
    open: false, // 取消预约dialog
    id: '', // 用户id
    order1: {}, // 个人预约的删除数据
    order2: {} // 实验室信息的删除数据
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.DIALOG:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

export default reducer;