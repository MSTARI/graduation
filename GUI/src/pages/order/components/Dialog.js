import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {laborData, closeDialog, setInfo, search} from '../action';

const mapStateToProps = state => {
    return {
        open: state.open,
        dataSource: state.dataSource,
        classroom: state.classroom,
        start: state.start,
        end: state.end
    };
};

const mapDispatchToProps = {
    laborData,
    closeDialog,
    setInfo,
    search
};

class Dialogs extends React.Component {
    componentDidMount() {
        this.props.laborData();
    }

    /**
     * 返回start或者end时间
     * @param {String} select 
     */
    selectDate(select) {
        const time = select === 'min' ? 'startTime' : 'endTime';
        const only = this.props.dataSource.filter(item => {
            return item.name === this.props.classroom;
        });
        if(only[0]) {
            return new Date(only[0][time]);
        }
    }

    render() {
        const {closeDialog, open, dataSource, classroom, start, end, setInfo, search} = this.props;
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label="确定"
                        primary={true}
                        onClick={() => {
                            closeDialog();
                            search(classroom);
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        secondary={true}
                        onClick={() => closeDialog()}
                    />
                ]}
                title="查询预约实验室"
                open={open}
                onRequestClose={() => closeDialog()}
            >
                <SelectField
                    style={{width: '100%'}}
                    autoWidth={true}
                    value={classroom}
                    floatingLabelText="实验室:"
                    onChange={(e, index, value) => setInfo('classroom', value)}
                >
                {
                    !dataSource.length ? null :
                    dataSource.map(item => {
                        return (
                            <MenuItem key={item._id} value={item.name} primaryText={item.name} />
                        );
                    })
                }
                </SelectField>
                <DatePicker
                    textFieldStyle={{width: '100%'}}
                    hintText="起始日期"
                    autoOk={true}
                    minDate={this.selectDate('min')}
                    maxDate={this.selectDate('max')}
                    disabled={!classroom}
                    value={start}
                    onChange={(e, date) => setInfo('start', date)}
                />
                <DatePicker
                    textFieldStyle={{width: '100%'}}
                    hintText="终止日期"
                    autoOk={true}
                    minDate={this.selectDate('min')}
                    maxDate={this.selectDate('max')}
                    disabled={!classroom}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);