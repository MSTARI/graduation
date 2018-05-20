import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {closeDetail} from '../action';

const mapStateToProps = state => {
    return {
        detailDia: state.detailDia
    };
};

const mapDispatchToProps = {
    closeDetail
};

class Dialogs extends React.Component {
    render() {
        const {title, content, detailDia, closeDetail} = this.props;
        return (
            <Dialog
                actions={
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => closeDetail()}
                    />
                }
                title={title}
                open={detailDia}
                onRequestClose={() => closeDetail()}
                contentStyle={{wordWrap: 'break-word'}}
                autoScrollBodyContent={true}
            >
                {content}
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);