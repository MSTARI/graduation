import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {getCookie} from '../../../commons/cookies';
import formatDate from '../../../commons/formatDate';
import {userData,cancelOrder} from '../action';

const cookie = getCookie('userId');

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    userData,
    cancelOrder
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.userData(cookie);
    }

    render() {
        const {dataSource, history, cancelOrder} = this.props;
        return (
            <div className="m-admin-list">
                <AppBar
                    className="appbar"
                    title="个人预约列表"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                {
                    !dataSource.length ? null :
                    <List className="list">
                        {
                            dataSource[0].order.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem
                                            primaryText={
                                                <div>
                                                    <p>
                                                        实验室：{item.classroom}
                                                    </p>
                                                    <p>
                                                        日期：{formatDate(item.date)}
                                                    </p>
                                                    <p>
                                                        课程：{item.course}
                                                    </p>
                                                    <p>
                                                        课节：{item.num + 1}
                                                    </p>
                                                    <RaisedButton
                                                        label="取消预约"
                                                        primary={true}
                                                        fullWidth={true}
                                                        onClick={() => cancelOrder(cookie, {
                                                            classroom: item.classroom, date: item.date
                                                        })}
                                                    />
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);