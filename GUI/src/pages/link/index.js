import React from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import './index.scss';
import {getCookie} from '../../commons/cookies';
import verifyAdmin from '../../commons/verifyAdmin';
import {getData} from '../../commons/getData';

class Laboratory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            notice: []
        };
    }

    componentWillUnmount() {
        this._isMounted = false; // 设置一个flag，当unmount的时候重置这个flag
    }

    componentDidMount() {
        this._isMounted = true; // 组件挂载后进行异步操作，组件卸载后异步操作还在执行，setState得不到值，所以需要设置一个flag
        if(!getCookie('userId')) { // 判断是否登录，进入登录页
            this.props.history.push('/login');
        }
        verifyAdmin(getCookie('userId'))
            .then(res => {
                if(this._isMounted) {
                    this.changeValue('admin', res);
                }
            });
        getData('/notice_api')
            .then(res => {
                if(res.length) {
                    this.changeValue('notice', res);
                }
            });
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const {history} = this.props;
        const {admin, notice} = this.state;
        return (
            <div className="m-link">
                <AppBar
                    title="实验室预约管理系统"
                    showMenuIconButton={false}
                />
                {
                    !notice.length ? null :
                    <div className="notice">
                        <i>公告：{notice[0].title}</i>
                    </div>
                }
                <List className={'m-link-' + (admin === 'true' ? 'admin' : 'user')}>
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