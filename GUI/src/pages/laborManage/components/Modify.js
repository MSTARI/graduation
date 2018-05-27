import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import {closeModify, modifyLabor, setInfo} from '../action';

const mapStateToProps = state => {
    return {
        modifyDia: state.modifyDia,
        name: state.name,
        start: state.start,
        end: state.end
    };
};

const mapDispatchToProps = {
    closeModify,
    modifyLabor,
    setInfo
};

class Modify extends React.Component {
    /**
     * 生成实验室固定数据
     * @param {*} time 
     */
    generatePlan() {
        const {start, end} = this.props;
        let plan = [];
        const days = Math.floor((end - start) / (24*3600*1000)) + 1;
        for(let i = 0; i < days; i++) {
            let temp = {
                status: [null, null, null, null, null]
            };
            temp.date = start.getTime() + i * 24 * 3600 * 1000;
            plan.push(temp);
        }
        return plan;
    }

    render() {
        const {modifyDia, name, start, end, closeModify, modifyLabor, setInfo} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            modifyLabor(name, start.getTime(), end.getTime(), this.generatePlan());
                            closeModify();
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeModify()}
                    />
                ]}
                title="修改实验室信息"
                open={modifyDia}
                onRequestClose={() => closeModify()}
                autoScrollBodyContent={true}
            >
                <TextField
                    style={{width: '100%'}}
                    floatingLabelText="实验室名称"
                    defaultValue={name}
                    disabled={true}
                />
                <DatePicker
                    textFieldStyle={{width: '100%'}}
                    hintText="起始日期"
                    autoOk={true}
                    value={start}
                    onChange={(e, date) => setInfo('start', date)}
                />
                <DatePicker
                    textFieldStyle={{width: '100%'}}
                    hintText="终止日期"
                    autoOk={true}
                    value={end}
                    onChange={(e, date) => setInfo('end', date)}
                    shouldDisableDate={date => {
                        return date < start;
                    }}
                />
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modify);