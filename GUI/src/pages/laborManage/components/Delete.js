import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {closeDelete, deleteLabor} from '../action';

const mapStateToProps = state => {
    return {
        deleteDia: state.deleteDia,
        name: state.name
    };
};

const mapDispatchToProps = {
    closeDelete,
    deleteLabor
};

class Delete extends React.Component {
    render() {
        const {deleteDia, closeDelete, deleteLabor, name} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            deleteLabor(name);
                            closeDelete();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDelete()}
                    />
                ]}
                title="删除实验室信息"
                open={deleteDia}
                onRequestClose={() => closeDelete()}
            >
                确认删除？
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete);