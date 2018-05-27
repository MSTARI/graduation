import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {closeDelete, deleteNew} from '../action';

const mapStateToProps = state => {
    return {
        deleteDia: state.deleteDia,
        title: state.title
    };
};

const mapDispatchToProps = {
    closeDelete,
    deleteNew
};

class Dialogs extends React.Component {
    render() {
        const {deleteDia, title, closeDelete, deleteNew} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            deleteNew(title);
                            closeDelete();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDelete()}
                    />
                ]}
                title="删除公告"
                open={deleteDia}
                onRequestClose={() => closeDelete()}
            >
                确认删除？
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);