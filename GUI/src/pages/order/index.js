import React from 'react';
import {Provider} from 'react-redux';
import store from './constants/store';
import List from './components/List';
import Dialog from './components/Dialog';
import DetailDialog from './components/DetailDialog';
import './index.scss';

class Order extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="m-order">
                    <List history={this.props.history} location={this.props.location} />
                    <Dialog />
                    <DetailDialog />
                </div>
            </Provider>
        );
    }
}

export default Order;