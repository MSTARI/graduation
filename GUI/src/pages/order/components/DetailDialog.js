import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {closeDetail, getUser, addOrder, cancelOrder} from '../action';
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
    addOrder,
    cancelOrder
};

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            snack: false
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
     * 提交数据到数据库,会根据是否是管理员，同时具备取消预约的功能
     */
    submit(admin) {
        const {addOrder, classroom, num, date, closeDetail, detail, cancelOrder} = this.props;
        const {course} = this.state;
        const address = this.getAddress(),
            dateIndex = this.getDateIndex();
        if(!course) { // 判断dialog是否可以填写数据
            if(!detail) { // 判断是否有课程数据
                this.changeValue('snack', true);
            } else {
                if(admin) { // 如果是管理员才有取消预约功能
                    cancelOrder(classroom, {
                        date,
                        dateIndex,
                        num
                    });
                    closeDetail();
                }
            }
        } else {
            addOrder(admin, cookie, {
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
            this.changeValue('course', '');
            closeDetail();
        }
    }

    render() {
        const {location, detailDia, closeDetail, detail} = this.props;
        const {course, snack} = this.state;
        const admin = !!location.hash.slice(1);
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label={admin && !!detail ? '取消预约' : '确定'}
                            primary={true}
                            onClick={() => this.submit(admin)}
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
                            value={course}
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
                <Snackbar
                    open={snack}
                    message="课程不能为空"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('snack', false)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);