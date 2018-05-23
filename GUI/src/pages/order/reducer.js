import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // laboratory列表数据
    open: false, // 预约实验室dialog
    classroom: '', // 实验室名称
    num: 0, // 点击对应节数
    date: '', // 点击对应日期
    start: null, // 开始日期
    end: null, // 结束日期
    searchData: [], // 在dialog中找到对应数据
    detailDia: false, // 预约详情dialog
    detail: null, // 每个预约情况详情
    userData: [] // 用户数据
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.DIALOG:
        case ActionType.SET:
        case ActionType.SEARCH:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default reducer;