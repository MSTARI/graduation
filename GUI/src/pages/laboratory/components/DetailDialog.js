import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {closeDetail} from '../action';

const mapStateToProps = state => {
    return {
        detailDia: state.detailDia,
        detail: state.detail
    };
};

const mapDispatchToProps = {
    closeDetail
};

class Dialogs extends React.Component {
    render() {
        const {detailDia, closeDetail, detail} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            closeDetail();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDetail()}
                    />
                ]}
                title="预约详情"
                open={detailDia}
                onRequestClose={() => closeDetail()}
            >
            {
                !detail ? null :
                <div>
                    <div>预约班级:{detail.address}</div>
                    <br />
                    <div>预约课程:{detail.course}</div>
                </div>
            }
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);