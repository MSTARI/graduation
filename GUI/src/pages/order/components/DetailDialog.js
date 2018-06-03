import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {closeDetail, getUser, addOrder, cancelOrder, setInfo} from '../action';
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
    cancelOrder,
    setInfo
};

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
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
        const address = admin === 'true' ? this.state.address : this.getAddress(),
            dateIndex = this.getDateIndex();
        if(!course || !address) { // 根据填写课程处判断是否是可预约状态
            if(!detail) { // 判断是否是展示详情状态
                this.changeValue('snack', true);
            } else {
                if(admin === 'true') { // 如果是管理员才有取消预约功能
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

    /**
     * 根据是否是管理员，可以直接取消预约
     * @param {String} admin 
     * @param {String} detail 
     */
    disabled(admin, detail) {
        if(admin === 'false') {
            if(!!detail) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    render() {
        const {location, detailDia, closeDetail, detail} = this.props;
        const {address, course, snack} = this.state;
        const admin = location.hash.slice(1);
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label={admin === 'true' && !!detail ? '取消预约' : '确定'}
                            primary={true}
                            onClick={() => this.submit(admin)}
                            disabled={this.disabled(admin, detail)}
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
                    autoScrollBodyContent={true}
                    repositionOnUpdate={false}
                >
                {
                    !detail ?
                    <div>
                        <TextField
                            style={{width: '100%'}}
                            floatingLabelText="预约班级"
                            defaultValue={admin === 'true' ? address : this.getAddress()}
                            disabled={admin === 'false'}
                            onChange={(e, value) => this.changeValue('address', value)}
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
                    message="填写信息不能为空"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('snack', false)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);