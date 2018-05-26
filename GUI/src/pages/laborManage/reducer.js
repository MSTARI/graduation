import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // 实验室数据源
    addDia: false, // 添加dialog状态
    deleteDia: false, // 删除dialog状态
    modifyDia: false, // 修改dialog状态
    name: '', // 实验室名称
    start: null, // 起始时间
    end: null // 终止时间
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.DIALOG:
        case ActionType.SET:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

export default reducer;