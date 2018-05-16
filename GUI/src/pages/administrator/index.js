import React from 'react';
import {Provider} from 'react-redux';
import store from './constants/store';
import List from './components/List';
import './index.scss';

class Administrator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="m-admin">
                    <List history={this.props.history} />
                </div>
            </Provider>
        );
    }
}

export default Administrator;