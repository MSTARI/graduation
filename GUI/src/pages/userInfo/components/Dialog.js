import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {closeDialog, updatePassword} from '../action';
import {getCookie, clearCookie} from '../../../commons/cookies';

const mapStateToProps = state => {
    return {
        open: state.open,
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    closeDialog,
    updatePassword
};

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: '',
            newa: '',
            newAgain: '',
            snack: false,
            message: ''
        };
    }

    verify() {
        const cookie = getCookie('userId');
        let result = false;
        this.props.dataSource.forEach(item => {
            if(item.id === cookie) {
                if(item.password === this.state.initial) {
                    result = true;
                }
            }
        });
        return result;
    }

    again() {
        const {newa, newAgain} = this.state;
        if(newa === newAgain) {
            return true;
        }
        return false;
    }

    submit() {
        const {history, updatePassword} = this.props;
        const cookie = getCookie('userId');
        if(!this.verify()) {
            this.changeValue('message', '原密码错误，请重新输入');
            this.changeValue('snack', true);
        } else if(!this.state.newa) {
            this.changeValue('message', '新密码不能为空，请重新输入');
            this.changeValue('snack', true);
        } else if(!this.again()) {
            this.changeValue('message', '两次密码不一致，请重新输入');
            this.changeValue('snack', true);
        } else {
            updatePassword(cookie, this.state.newa);
            clearCookie('userId');
            history.push('/login');
        }
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const {open, closeDialog} = this.props;
        const {initial, newa, newAgain, snack, message} = this.state;
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label="确定"
                            primary={true}
                            onClick={() => this.submit()}
                        />,
                        <FlatButton
                            label="取消"
                            secondary={true}
                            onClick={() => closeDialog()}
                        />
                    ]}
                    title="修改密码"
                    open={open}
                    onRequestClose={() => closeDialog()}
                >
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="原密码"
                        type="password"
                        value={initial}
                        onChange={(e, value) => this.changeValue('initial', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="新密码"
                        type="password"
                        value={newa}
                        onChange={(e, value) => this.changeValue('newa', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="再次输入"
                        type="password"
                        value={newAgain}
                        onChange={(e, value) => this.changeValue('newAgain', value)}
                    />
                    <p style={{textAlign: 'center', color: '#E91E63'}}>修改密码后会重新登录!</p>
                </Dialog>
                <Snackbar
                    open={snack}
                    message={message}
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('snack', false)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);