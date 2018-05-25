import ActionType from './constants/ActionType';

const initialState = {
    dataSource: [],
    addDia: false,
    deleteDia: false,
    modifyDia: false,
    selectDia: false,
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    authority: 0
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