import ActionType from './constants/ActionType';

const defaultState = {
    dataSource: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
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