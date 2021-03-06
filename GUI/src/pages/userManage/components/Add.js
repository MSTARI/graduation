import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {closeAdd, addUser} from '../action';

const mapStateToProps = state => {
    return {
        addDia: state.addDia
    };
};

const mapDispatchToProps = {
    closeAdd,
    addUser
};

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            email: '',
            phone: '',
            authority: 0,
            snack: false,
            emailSnack: false,
            phoneSnack: false
        };
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    /**
     * 邮箱和手机号正则判断
     * @param {String} type 
     * @param {string} reg 
     */
    checkRegexp(type, reg) {
        const email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            phone = /^1\d{10}$/;
        switch(type) {
            case 'email':
                if(!email.test(reg)) {
                    this.changeValue('emailSnack', true);
                    return false;
                }
                return true;
            case 'phone':
                if(!phone.test(reg)) {
                    this.changeValue('phoneSnack', true);
                    return false;
                }
                return true;
            default:
                return true;
        }
    }

    render() {
        const {closeAdd, addDia, addUser} = this.props;
        const {id, name, address, email, phone, authority, snack, emailSnack, phoneSnack} = this.state;
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label="确定"
                            primary={true}
                            onClick={() => {
                                if(this.checkRegexp('email', email) && this.checkRegexp('phone', phone)) {
                                    this.changeValue('snack', true);
                                    addUser(id, name, email, phone, address, authority);
                                    closeAdd();
                                }
                            }}
                            disabled={!id || !name || !address || !email || !phone}
                        />,
                        <FlatButton
                            label="取消"
                            secondary={true}
                            onClick={() => closeAdd()}
                        />
                    ]}
                    title="添加用户信息"
                    open={addDia}
                    onRequestClose={() => closeAdd()}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={false}
                >
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户ID"
                        value={id}
                        onChange={(e, value) => this.changeValue('id', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户名称"
                        value={name}
                        onChange={(e, value) => this.changeValue('name', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="邮箱"
                        value={email}
                        onChange={(e, value) => this.changeValue('email', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="电话"
                        value={phone}
                        onChange={(e, value) => this.changeValue('phone', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户位置"
                        value={address}
                        onChange={(e, value) => this.changeValue('address', value)}
                    />
                    <SelectField
                        style={{width: '100%'}}
                        autoWidth={true}
                        floatingLabelText="用户权限"
                        value={authority}
                        onChange={(event, index, value) => this.changeValue('authority', value)}
                    >
                        <MenuItem value={0} primaryText="普通用户" />
                        <MenuItem value={1} primaryText="管理员" />
                    </SelectField>
                </Dialog>
                <Snackbar
                    open={snack}
                    message="添加成功"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('snack', false)}
                />
                <Snackbar
                    open={emailSnack}
                    message="邮箱格式不正确"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('emailSnack', false)}
                />
                <Snackbar
                    open={phoneSnack}
                    message="手机号格式不正确"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('phoneSnack', false)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);