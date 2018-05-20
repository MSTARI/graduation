import ActionType from './constants/ActionType';

const initialState = {
    dataSource: []
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