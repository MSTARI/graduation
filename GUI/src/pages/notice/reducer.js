import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // 公告数据源
    detailDia: false, // 公告详情dialog状态
    addDia: false, // 添加dialog状态
    deleteDia: false, // 删除dialog状态
    title: '', // 公告标题
    content: '' // 公告内容
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.ADDDATA:
        case ActionType.DIALOG:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default reducer;