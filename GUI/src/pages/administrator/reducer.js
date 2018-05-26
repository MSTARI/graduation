import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [] // 用户数据源
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default reducer;