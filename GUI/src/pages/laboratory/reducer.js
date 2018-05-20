import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [],
    open: false,
    classroom: '',
    start: null,
    end: null,
    searchData: [],
    detailDia: false,
    detail: null
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