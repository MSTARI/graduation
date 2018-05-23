import React from 'react';
import {Provider} from 'react-redux';
import store from './constants/store';
import List from './components/List';
import './index.scss';
import AddDialog from './components/AddDialog';
import DetailDialog from './components/DetailDialog';

class Notice extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="m-notice">
                    <List history={this.props.history} />
                    <AddDialog />
                    <DetailDialog />
                </div>
            </Provider>
        );
    }
}

export default Notice;