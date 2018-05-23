import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {postData} from '../../commons/getData';

const adminData = () => (dispatch, getState) => {
    postData('/personInfo_api')
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