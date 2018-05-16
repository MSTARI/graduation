import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {getData} from '../../commons/getData';

const adminData = () => (dispatch, getState) => {
    getData('/administrator_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

export {
    adminData
};