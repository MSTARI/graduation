import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // 用户数据源
    addDia: false, // 添加dialog状态
    deleteDia: false, // 删除dialog状态
    modifyDia: false, // 修改dialog状态
    id: '', // 用户id
    name: '', //用户名称
    email: '', // 用户email
    phone: '', // 用户手机号
    address: '', // 用户所在位置
    authority: 0 // 用户权限
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