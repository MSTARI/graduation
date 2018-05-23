import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {closeAdd, addNew} from '../action';

const mapStateToProps = state => {
    return {
        addDia: state.addDia
    };
};

const mapDispatchToProps = {
    closeAdd,
    addNew
};

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const {addDia, closeAdd, addNew} = this.props;
        const {title, content} = this.state;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            if(title && content) {
                                addNew(title, content);
                                closeAdd();
                            }
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeAdd()}
                    />
                ]}
                title="新增公告"
                open={addDia}
                onRequestClose={() => closeAdd()}
            >
                <TextField
                    style={{width: '100%'}}
                    hintText="填写标题"
                    floatingLabelText="标题"
                    floatingLabelFixed={true}
                    value={title}
                    onChange={(e, value) => this.changeValue('title', value)}
                />
                <TextField
                    style={{width: '100%'}}
                    hintText="填写内容"
                    floatingLabelText="内容"
                    floatingLabelFixed={true}
                    value={content}
                    onChange={(e, value) => this.changeValue('content', value)}
                />
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);