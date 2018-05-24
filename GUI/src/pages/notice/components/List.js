import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {noticeData, openDetail, openAdd, deleteNew} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    noticeData,
    openDetail,
    openAdd,
    deleteNew
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.noticeData();
    }

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
        const {dataSource, history, location, openDetail, openAdd, deleteNew} = this.props;
        const admin = !!location.hash.slice(1);
        return (
            <div className="m-notice-list">
                <AppBar
                    className="appbar"
                    title="公告栏"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                    iconElementRight={!admin ? null : <IconButton iconClassName="material-icons">add_circle_outline</IconButton>}
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
                                            !admin ? null :
                                            <div style={{textAlign: 'right'}}>
                                                <RaisedButton
                                                    icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                                                    secondary={true}
                                                    onClick={() => deleteNew(item.title)}
                                                />
                                            </div>
                                        }
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