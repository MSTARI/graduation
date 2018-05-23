import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {closeDetail, getUser, addOrder} from '../action';
import {getCookie} from '../../../commons/cookies';

const cookie = getCookie('userId');

const mapStateToProps = state => {
    return {
        detailDia: state.detailDia,
        detail: state.detail,
        searchData: state.searchData,
        userData: state.userData,
        classroom: state.classroom,
        num: state.num,
        date: state.date
    };
};

const mapDispatchToProps = {
    closeDetail,
    getUser,
    addOrder
};

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: ''
        };
    }

    componentDidMount() {
        this.props.getUser();
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    /**
     * 根据用户数据获取对应班级
     */
    getAddress() {
        let result = '';
        this.props.userData.forEach(item => {
            if(item.id === cookie) {
                result = item.address;
            }
        });
        return result;
    }

    /**
     * 获取日期所在的索引
     */
    getDateIndex() {
        let result = '';
        this.props.searchData[0].plan.forEach((item, index) => {
            if(item.date === this.props.date) {
                result = index;
            }
        });
        return result;
    }

    /**
     * 提交数据到数据库
     */
    submit() {
        const {addOrder, classroom, num, date} = this.props;
        const {course} = this.state;
        const address = this.getAddress(),
            dateIndex = this.getDateIndex();
        addOrder(cookie, {
            classroom,
            date,
            num,
            course
        },
        classroom,
        {
            date,
            dateIndex,
            num,
            address,
            course
        });
    }

    render() {
        const {detailDia, closeDetail, detail} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            closeDetail();
                            this.submit();
                        }}
                        disabled={!!detail}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDetail()}
                    />
                ]}
                title="预约详情"
                open={detailDia}
                onRequestClose={() => closeDetail()}
            >
            {
                !detail ?
                <div>
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="预约班级"
                        defaultValue={this.getAddress()}
                        disabled={true}
                    />
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="预约课程"
                        value={this.state.course}
                        onChange={(e, value) => this.changeValue('course', value)}
                    />
                </div> :
                <div>
                    <div>预约班级:{detail.address}</div>
                    <br />
                    <div>预约课程:{detail.course}</div>
                </div>
            }
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);