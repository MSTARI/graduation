import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {noticeData, openDetail, openAdd, openDelete} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    noticeData,
    openDetail,
    openAdd,
    openDelete
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.noticeData();
    }

    /**
     * 格式化时间戳
     * @param {Number} timestamp 
     */
    formatTime(timestamp) {
        const time = new Date(timestamp);
        const year = time.getFullYear(),
            month = time.getMonth() + 1,
            day = time.getDate(),
            hour = time.getHours(),
            minute = time.getMinutes(),
            second = time.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    render() {
        const {dataSource, history, location, openDetail, openAdd, openDelete} = this.props;
        const admin = location.hash.slice(1);
        return (
            <div className="m-notice-list">
                <AppBar
                    className="appbar"
                    title="公告栏"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                    iconElementRight={admin === 'false' ? null : <IconButton iconClassName="material-icons">add_circle_outline</IconButton>}
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
                                            primaryText={item.title}
                                            secondaryText={
                                                <p>
                                                    <span>内容：{item.content}</span><br />
                                                    <span>时间：{this.formatTime(item.time)}</span>
                                                </p>
                                            }
                                            secondaryTextLines={2}
                                            leftIcon={<FontIcon className="material-icons">event_note</FontIcon>}
                                            onClick={() => openDetail(item.title, item.content, item.time)}
                                        />
                                        {
                                            admin === 'false' ? null :
                                            <div style={{textAlign: 'right'}}>
                                                <RaisedButton
                                                    icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                                                    secondary={true}
                                                    onClick={() => openDelete(item.title)}
                                                />
                                            </div>
                                        }
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