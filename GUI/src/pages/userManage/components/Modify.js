import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {closeModify, modifyUser, setInfo} from '../action';

const mapStateToProps = state => {
    return {
        modifyDia: state.modifyDia,
        id: state.id,
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        authority: state.authority
    };
};

const mapDispatchToProps = {
    closeModify,
    modifyUser,
    setInfo
};

class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const {modifyDia, id, name, email, phone, address, authority, closeModify, modifyUser, setInfo} = this.props;
        const {emailSnack, phoneSnack} = this.state;
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label="确定"
                            primary={true}
                            onClick={() => {
                                if(this.checkRegexp('email', email) && this.checkRegexp('phone', phone)) {
                                    modifyUser(id, {
                                        name,
                                        email,
                                        phone,
                                        address,
                                        authority
                                    });
                                    closeModify();
                                }
                            }}
                            disabled={!name || !address || !email || !phone}
                        />,
                        <FlatButton
                            label="取消"
                            secondary={true}
                            onClick={() => closeModify()}
                        />
                    ]}
                    title="修改用户信息"
                    open={modifyDia}
                    onRequestClose={() => closeModify()}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={false}
                >
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户ID"
                        defaultValue={id}
                        disabled={true}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户名称"
                        value={name}
                        onChange={(e, value) => setInfo('name', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="邮箱"
                        value={email}
                        onChange={(e, value) => setInfo('email', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="电话"
                        value={phone}
                        onChange={(e, value) => setInfo('phone', value)}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="用户位置"
                        value={address}
                        onChange={(e, value) => setInfo('address', value)}
                    />
                    <SelectField
                        style={{width: '100%'}}
                        autoWidth={true}
                        floatingLabelText="用户权限"
                        value={authority}
                        onChange={(event, index, value) => setInfo('authority', value)}
                    >
                        <MenuItem value={0} primaryText="普通用户" />
                        <MenuItem value={1} primaryText="管理员" />
                    </SelectField>
                </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modify);