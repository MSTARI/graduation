import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {userData, openDialog} from '../action';
import {getCookie, clearCookie} from '../../../commons/cookies';

const mapStateToProps = state => {
    return {
        dataSource: state.dataSource
    };
};

const mapDispatchToProps = {
    userData,
    openDialog
};

class Lists extends React.Component {
    componentDidMount() {
        this.props.userData();
    }

    /**
     * 注销
     * @param {Object} history 
     */
    logout(history) {
        clearCookie('userId');
        history.push('/login');
    }

    render() {
        const {dataSource, history, openDialog} = this.props;
        const cookie = getCookie('userId');
        return (
            <div className="m-user-info">
                <AppBar
                    className="appbar"
                    title="个人信息"
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                {
                    !dataSource.length ? null :
                    dataSource.map(item => {
                        if(item.id === cookie) {
                            return (
                                <div className="list" key={item._id}>
                                    <p>
                                        <FontIcon className="material-icons">credit_card</FontIcon> {item.id}
                                    </p>
                                    <p>
                                        <FontIcon className="material-icons">person</FontIcon> {item.name}
                                    </p>
                                    <p>
                                        <FontIcon className="material-icons">email</FontIcon> {item.email}
                                    </p>
                                    <p>
                                        <FontIcon className="material-icons">phone</FontIcon> {item.phone}
                                    </p>
                                    <p>
                                        <FontIcon className="material-icons">my_location</FontIcon> {item.address}
                                    </p>
                                </div>
                            );
                        }
                        return false;
                    })
                }
                <div className="btn">
                    <RaisedButton
                        label="修改密码"
                        primary={true}
                        onClick={() => openDialog()}
                    />
                    <RaisedButton
                        label="注销"
                        primary={true}
                        onClick={() => this.logout(history)}
                    />
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);