import React from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import './index.scss';
import {getCookie} from '../../commons/cookies';
import verifyAdmin from '../../commons/verifyAdmin';

class Laboratory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        if(!getCookie('userId')) {
            this.props.history.push('/login');
        }
        verifyAdmin(getCookie('userId'))
            .then(res => {
                if(this._isMounted) {
                    this.setState({
                        admin: res
                    });
                }
            });
    }

    render() {
        const {history} = this.props;
        const {admin} = this.state;
        return (
            <div className="m-link">
                <AppBar
                    title="实验室预约管理系统"
                    showMenuIconButton={false}
                />
                <List className="m-link-list">
                    <ListItem
                        style={{background: '#E0F7FA', marginBottom: '5%'}}
                        primaryText="实验室预约"
                        onClick={() => {
                            history.push(`/order#${admin}`);
                        }}
                    />
                    {
                        admin ? null :
                            <ListItem
                            style={{background: '#B2EBF2', marginBottom: '5%'}}
                            primaryText="取消预约"
                            onClick={() => {
                                history.push('/unorder');
                            }}
                        />
                    }
                    {
                        !admin ? null :
                            <ListItem
                            style={{background: '#B2EBF2', marginBottom: '5%'}}
                            primaryText="实验室管理"
                            onClick={() => {
                                history.push('/laborManage');
                            }}
                        />
                    }
                    <ListItem
                        style={{background: '#80DEEA', marginBottom: '5%'}}
                        primaryText="公告栏"
                        onClick={() => {
                            history.push(`/notice#${admin}`);
                        }}
                    />
                    <ListItem
                        style={{background: '#4DD0E1', marginBottom: '5%'}}
                        primaryText="个人信息"
                        onClick={() => {
                            history.push('/userInfo');
                        }}
                    />
                    <ListItem
                        style={{background: '#26C6DA'}}
                        primaryText="联系管理员"
                        onClick={() => {
                            history.push('/administrator');
                        }}
                    />
                    {
                        !admin ? null :
                            <ListItem
                            style={{background: '#00BCD4', marginTop: '5%'}}
                            primaryText="用户管理"
                            onClick={() => {
                                history.push('/userManage');
                            }}
                        />
                    }
                </List>
            </div>
        );
    }
}

export default Laboratory;