import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = {

};

class Dialogs extends React.Component {
    render() {
        return (
            <Dialog
                title="新增公告"
                // actions={actions}
                // modal={false}
                // open={this.state.open}
                // onRequestClose={this.handleClose}
            >
                特殊
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);