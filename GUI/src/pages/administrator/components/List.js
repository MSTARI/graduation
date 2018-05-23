import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import {adminData} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    adminData
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.adminData();
    }

    render() {
        const {dataSource, history} = this.props;
        return (
            <div className="m-admin-list">
                <AppBar
                    className="appbar"
                    title="管理员信息"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                {
                    !dataSource.length ? null :
                    <List className="list">
                        {
                            dataSource.map(item => {
                                if(item.authority) {
                                    return (
                                        <div key={item._id}>
                                            <ListItem
                                                primaryText={
                                                    <div>
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
                                                    </div>
                                                }
                                            />
                                            <Divider />
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </List>
                }
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);