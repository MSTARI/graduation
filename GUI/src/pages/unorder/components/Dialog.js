import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {cancelOrder, closeDia} from '../action';

const mapStateToProps = state => {
    return {
        open: state.open,
        id: state.id,
        order1: state.order1,
        order2: state.order2
    };
};

const mapDispatchToProps = {
    closeDia,
    cancelOrder
};

class Dialogs extends React.Component {
    render() {
        const {closeDia, cancelOrder, open, id, order1, order2} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            cancelOrder(id, order1, order2);
                            closeDia();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDia()}
                    />
                ]}
                title="取消预约"
                open={open}
                onRequestClose={() => closeDia()}
            >
                确认取消？
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);