import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
    render() {
        const {modifyDia, id, name, email, phone, address, authority, closeModify, modifyUser, setInfo} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            modifyUser(id, {
                                name,
                                email,
                                phone,
                                address,
                                authority
                            });
                            closeModify();
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modify);