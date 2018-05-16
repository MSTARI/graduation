import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {noticeData} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    noticeData
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.noticeData();
    }

    render() {
        const {dataSource, history} = this.props;
        return (
            <div className="m-notice-list">
                <AppBar
                    className="appbar"
                    title="公告栏"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                    iconElementRight={<IconButton iconClassName="material-icons">add_circle_outline</IconButton>}
                    onRightIconButtonClick={() => {

                    }}
                />
                {
                    !dataSource.length ? null :
                    <List className="list">
                        {
                            dataSource.map(item => {
                                return (
                                    <ListItem
                                        key={item._id}
                                        primaryText={item.title}
                                        secondaryText={item.content}
                                        leftIcon={<FontIcon className="material-icons">event_note</FontIcon>}
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