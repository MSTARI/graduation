import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import './index.scss';
  
class Login extends React.Component {
    render() {
        return (
            <div className="m-login">
                <AppBar
                    title="实验室预约管理系统"
                    showMenuIconButton={false}
                />
                <div className="m-login-content">
                    <TextField
                        floatingLabelText="UserName"
                    />
                    <RadioButtonGroup className="loginRadio" name="login">
                        <RadioButton
                            value="user"
                            label="教师/学生"
                        />
                        <RadioButton
                            value="administrator"
                            label="管理员"
                        />
                    </RadioButtonGroup>
                </div>
                <RaisedButton label="登录" primary={true} />
            </div>
        );
    }
}

export default Login;