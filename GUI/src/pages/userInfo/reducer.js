import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [], // 用户信息源
    open: false // dialog状态
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.UPDATEPASSWORD:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default reducer;