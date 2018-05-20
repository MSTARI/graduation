import React from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import './index.scss';
import {getCookie} from '../../commons/cookies';
  
class Laboratory extends React.Component {
    componentDidMount() {
        if(!getCookie('userId')) {
            this.props.history.push('/login');
        }
    }

    render() {
        const {history} = this.props;
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
                            history.push('/laboratory');
                        }}
                    />
                    <ListItem
                        style={{background: '#B2EBF2', marginBottom: '5%'}}
                        primaryText="取消预约"
                    />
                    <ListItem
                        style={{background: '#80DEEA', marginBottom: '5%'}}
                        primaryText="公告栏"
                        onClick={() => {
                            history.push('/notice');
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
                </List>
            </div>
        );
    }
}

export default Laboratory;