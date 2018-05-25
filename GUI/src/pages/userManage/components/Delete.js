import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {closeDelete, deleteUser} from '../action';

const mapStateToProps = state => {
    return {
        deleteDia: state.deleteDia,
        id: state.id
    };
};

const mapDispatchToProps = {
    closeDelete,
    deleteUser
};

class Delete extends React.Component {
    render() {
        const {deleteDia, closeDelete, deleteUser, id} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            deleteUser(id);
                            closeDelete();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDelete()}
                    />
                ]}
                title="删除用户信息"
                open={deleteDia}
                onRequestClose={() => closeDelete()}
            >
                确认删除？
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete);