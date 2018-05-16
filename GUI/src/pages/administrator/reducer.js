import ActionType from './constants/ActionType';

const initialState = {
    dataSource: []
};

const reducer = (state, action) => {
    state = initialState;
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