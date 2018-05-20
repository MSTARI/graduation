import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './index.scss';
import {postData} from '../../commons/getData';
import {setCookie} from '../../commons/cookies';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            check: 0,
            open: false
        };
    }

    checkLogin(username, password) {
        postData('/userInfo_api')
            .then(res => {
                if(res.length) {
                    const result = res.filter(item => {
                        return item.id === username && item.password === password && item.authority === this.state.check;
                    });
                    if(result.length) {
                        setCookie('userId', username, 7);
                        this.props.history.push('/');
                    } else {
                        this.changeValue('open', true);
                    }
                }
            });
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const {username, password, check, open} = this.state;
        return (
            <div className="m-login">
                <AppBar
                    title="实验室预约管理系统"
                    showMenuIconButton={false}
                />
                <div className="m-login-content">
                    <TextField
                        floatingLabelText="UserName"
                        value={username}
                        onChange={(e, value) => this.changeValue('username', value)}
                    />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        value={password}
                        onChange={(e, value) => this.changeValue('password', value)}
                    />
                    <RadioButtonGroup
                        className="login-radio"
                        name="login"
                        defaultSelected={check}
                        onChange={(e, value) => this.changeValue('check', value)}
                    >
                        <RadioButton
                            value={0}
                            label="教师/学生"
                        />
                        <RadioButton
                            value={1}
                            label="管理员"
                        />
                    </RadioButtonGroup>
                </div>
                <RaisedButton
                    label="登录"
                    primary={true}
                    onClick={() => {
                        if(username && password) {
                            this.checkLogin(username, password);
                        } else {
                            this.changeValue('open', true);
                        }
                    }}
                />
                <Dialog
                    actions={
                        <FlatButton
                            label="知道了"
                            primary={true}
                            onClick={() => this.changeValue('open', false)}
                        />
                    }
                    open={open}
                    onRequestClose={() => this.changeValue('open', false)}
                >
                    信息填写有误，请重新填写！
                </Dialog>
            </div>
        );
    }
}

export default Login;