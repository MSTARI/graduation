import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {userData} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    userData
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.userData();
    }

    render() {
        const {dataSource, history} = this.props;
        return (
            <div className="m-user-list">
                <AppBar
                    className="appbar"
                    title="个人信息"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                {
                    !dataSource.length ? null :
                    <List className="list">
                        {
                            dataSource.map(item => {
                                return (
                                    <ListItem
                                        key={item._id}
                                        primaryText={
                                            <div>
                                                <p>
                                                    <FontIcon className="material-icons">credit_card</FontIcon> {item.id}
                                                </p>
                                                <p>
                                                    <FontIcon className="material-icons">person</FontIcon> {item.name}
                                                </p>
                                                <p>
                                                    <FontIcon className="material-icons">my_location</FontIcon> {item.address}
                                                </p>
                                            </div>
                                        }
                                    />
                                );
                            })
                        }
                    </List>
                }
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);