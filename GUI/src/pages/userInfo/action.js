import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import {postData} from '../../commons/getData';

const userData = () => (dispatch, getState) => {
    postData('/userInfo_api')
        .then(res => {
            if(res.length) {
                dispatch(createAction(ActionType.GETDATA, {
                    dataSource: res
                }));
            }
        });
};

export {
    userData
};