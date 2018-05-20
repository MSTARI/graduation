import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {noticeData, openDetail, openAdd} from '../action';
import DetailDialog from './DetailDialog';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    noticeData,
    openDetail,
    openAdd
};

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };
    }

    componentDidMount() {
        this.props.noticeData();
    }

    detailInfo(title, content) {
        this.setState({
            title,
            content
        });
    }

    render() {
        const {dataSource, history, openDetail, openAdd} = this.props;
        const {title, content} = this.state;
        return (
            <div className="m-notice-list">
                <AppBar
                    className="appbar"
                    title="公告栏"
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
                                    <ListItem
                                        key={item._id}
                                        primaryText={item.title}
                                        secondaryText={item.content}
                                        leftIcon={<FontIcon className="material-icons">event_note</FontIcon>}
                                        onClick={() => {
                                            this.detailInfo(item.title, item.content);
                                            openDetail();
                                        }}
                                    />
                                );
                            })
                        }
                    </List>
                }
                <DetailDialog title={title} content={content} />
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);