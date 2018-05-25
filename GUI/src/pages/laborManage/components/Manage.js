import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import formatDate from '../../../commons/formatDate';
import {laborData, openAdd, openModify, openDelete} from '../action';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    laborData,
    openAdd,
    openModify,
    openDelete
};

class Manage extends React.Component {
    componentDidMount() {
        this.props.laborData();
    }

    render() {
        const {dataSource, history, openAdd, openDelete, openModify} = this.props;
        return (
            <div className="m-userm-list">
                <AppBar
                    className="appbar"
                    title="实验室管理"
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
                                                        <FontIcon className="material-icons">location_city</FontIcon> {item.name}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">timer</FontIcon> {formatDate(item.startTime)}
                                                    </p>
                                                    <p>
                                                        <FontIcon className="material-icons">timer_off</FontIcon> {formatDate(item.endTime)}
                                                    </p>
                                                    <div className="btn">
                                                        <RaisedButton
                                                            label="修改"
                                                            primary={true}
                                                            onClick={() => openModify(item.name, new Date(item.startTime), new Date(item.endTime))}
                                                        />
                                                        <RaisedButton
                                                            label="删除"
                                                            primary={true}
                                                            onClick={() => openDelete(item.name)}
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