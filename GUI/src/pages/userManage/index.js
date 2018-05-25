import React from 'react';
import {Provider} from 'react-redux';
import store from './constants/store';
import Manage from './components/Manage';
import Add from './components/Add';
import Modify from './components/Modify';
import Delete from './components/Delete';
import './index.scss';

class UserManage extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="m-userm">
                    <Manage history={this.props.history} />
                    <Add />
                    <Modify />
                    <Delete />
                </div>
            </Provider>
        );
    }
}

export default UserManage;