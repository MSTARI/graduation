import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {userData, openAdd, openDelete, openModify} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    userData,
    openAdd,
    openDelete,
    openModify
};

class Manage extends React.Component {
    componentDidMount() {
        this.props.userData();
    }

    render() {
        const {dataSource, history, openAdd, openDelete, openModify} = this.props;
        return (
            <div className="m-userm-list">
                <AppBar
                    className="appbar"
                    title="用户管理"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                    iconElementRight={<IconButton iconClassName="material-icons">add_circle_outline</IconButton>}
                    onRightIconButtonClick={() => openAdd()}
                />
                {
                    !dataSource.length ? null :
                    <List className="list">
                        {
                            dataSource.map(item => {
                                return (
                                    <div key={item._id}>
                                        <ListItem
                                            primaryText={
                                                <div>
                                                    <p>
                                                        <FontIcon className="material-icons">credit_card</FontIcon> {item.id}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">person</FontIcon> {item.name}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">email</FontIcon>  {item.email}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">phone</FontIcon>  {item.phone}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">my_location</FontIcon> {item.address}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">vpn_key</FontIcon> {item.authority ? '管理员' : '普通用户'}
                                                    </p>
                                                    <div className="btn">
                                                        <RaisedButton
                                                            label="修改"
                                                            primary={true}
                                                            onClick={() => openModify(item.id, item.name, item.email, item.phone, item.address, item.authority)}
                                                        />
                                                        <RaisedButton
                                                            label="删除"
                                                            primary={true}
                                                            onClick={() => openDelete(item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        />
                                        <Divider />
                                    </div>
                                );
                            })
                        }
                    </List>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);