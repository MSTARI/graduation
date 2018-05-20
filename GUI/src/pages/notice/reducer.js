import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [],
    detailDia: false,
    addDia: false
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.GETDATA:
        case ActionType.ADDDATA:
        case ActionType.OPENDIALOG:
        case ActionType.CLOSEDIALOG:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default reducer;