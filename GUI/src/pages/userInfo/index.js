import React from 'react';
import {Provider} from 'react-redux';
import store from './constants/store';
import Info from './components/Info';
import Dialog from './components/Dialog';
import './index.scss';

class Administrator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="m-user">
                    <Info history={this.props.history} />
                    <Dialog history={this.props.history} />
                </div>
            </Provider>
        );
    }
}

export default Administrator;