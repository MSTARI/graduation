import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {getCookie} from '../../../commons/cookies';
import formatDate from '../../../commons/formatDate';
import {userData, laborData, openDia} from '../action';

const cookie = getCookie('userId');

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource,
        allData: state.allData
    };
};

const mapDispatchToProps = {
    userData,
    laborData,
    openDia
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.userData(cookie);
        this.props.laborData();
    }

    dateIndex(classroom, date) {
        let result = 0;
        this.props.allData.forEach(item => {
            if(item.name === classroom) {
                item.plan.forEach((each, index) => {
                    if(each.date === date) {
                        result = index;
                    }
                });
            }
        });
        return result;
    }

    jump(history) {
        history.push('/order');
    }

    render() {
        const {dataSource, history, openDia} = this.props;
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
                            !dataSource[0].order.length ?
                            <div
                                style={{marginTop: '60%',color: '#00BCD4',textAlign: 'center'}}
                                onClick={() => this.jump(history)}
                            >
                                没有数据哦!
                                <br /><br />
                                请点击文本跳转到实验室预约
                            </div> :
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
                                                        onClick={() => {
                                                            openDia(cookie, {
                                                                classroom: item.classroom,
                                                                date: item.date,
                                                                num: item.num
                                                            }, {
                                                                classroom: item.classroom,
                                                                dateIndex: this.dateIndex(item.classroom, item.date),
                                                                num: item.num
                                                            });
                                                        }}
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