import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [],
    allData: [],
    open: false,
    id: '',
    order1: {},
    order2: {}
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