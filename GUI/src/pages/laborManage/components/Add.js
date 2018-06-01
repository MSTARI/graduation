import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';
import {closeAdd, addLabor} from '../action';

const mapStateToProps = state => {
    return {
        addDia: state.addDia
    };
};

const mapDispatchToProps = {
    closeAdd,
    addLabor
};

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            start: null,
            end: null,
            snack: false
        };
    }

    changeValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    /**
     * 生成实验室固定数据
     * @param {*} time 
     */
    generatePlan() {
        const {start, end} = this.state;
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
        const {closeAdd, addDia, addLabor} = this.props;
        const {name, start, end, snack} = this.state;
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label="确定"
                            primary={true}
                            onClick={() => {
                                this.changeValue('snack', true);
                                addLabor(name, start.getTime(), end.getTime(), this.generatePlan());
                                closeAdd();
                            }}
                            disabled={!name || !start || !end}
                        />,
                        <FlatButton
                            label="取消"
                            secondary={true}
                            onClick={() => closeAdd()}
                        />
                    ]}
                    title="添加实验室信息"
                    open={addDia}
                    onRequestClose={() => closeAdd()}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={false}
                >
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="实验室名称"
                        value={name}
                        onChange={(e, value) => this.changeValue('name', value)}
                    />
                    <DatePicker
                        textFieldStyle={{width: '100%'}}
                        hintText="起始日期"
                        autoOk={true}
                        disabled={!name}
                        value={start}
                        onChange={(e, date) => this.changeValue('start', date)}
                    />
                    <DatePicker
                        textFieldStyle={{width: '100%'}}
                        hintText="终止日期"
                        autoOk={true}
                        disabled={!name}
                        value={end}
                        onChange={(e, date) => this.changeValue('end', date)}
                        shouldDisableDate={date => {
                            return date < start;
                        }}
                    />
                </Dialog>
                <Snackbar
                    open={snack}
                    message="添加成功"
                    autoHideDuration={1500}
                    onRequestClose={() => this.changeValue('snack', false)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);