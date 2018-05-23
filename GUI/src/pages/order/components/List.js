import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import {openDialog, openDetail} from '../action';
import formatDate from '../../../commons/formatDate';

const tableHeight = window.screen.height - (64 + 58); // 表格body高度

const mapStateToProps = state => {
    return {
        searchData: state.searchData,
        classroom: state.classroom,
        start: state.start,
        end: state.end
    };
};

const mapDispatchToProps = {
    openDialog,
    openDetail
};

class Lists extends React.Component {
    render() {
        const {searchData, history, classroom, openDialog, openDetail, start, end} = this.props;
        return (
            <div className="m-order-list">
                <AppBar
                    className="appbar"
                    title={classroom + ' 预约列表'}
                    iconElementLeft={<IconButton iconClassName="material-icons">arrow_back</IconButton>}
                    onLeftIconButtonClick={() => history.goBack()}
                    iconElementRight={<IconButton iconClassName="material-icons">search</IconButton>}
                    onRightIconButtonClick={() => openDialog()}
                />
                {
                    !searchData.length ?
                    <div className="nodata">没有数据哦<br /><br />请先点击右上角进行对应实验室预约！</div> :
                    <Table
                        headerStyle={{marginTop: '64px'}}
                        height={tableHeight + 'px'}
                        selectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn colSpan="3">日期</TableHeaderColumn>
                                <TableHeaderColumn>一</TableHeaderColumn>
                                <TableHeaderColumn>二</TableHeaderColumn>
                                <TableHeaderColumn>三</TableHeaderColumn>
                                <TableHeaderColumn>四</TableHeaderColumn>
                                <TableHeaderColumn>晚</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            stripedRows={true}
                            displayRowCheckbox={false}
                        >
                        {
                            start && end ?
                            searchData[0].plan.map(item => {
                                if(item.date >= start.getTime() && item.date <= (end.getTime() + 8 * 60 * 60 * 1000)) {
                                    return (
                                        <TableRow key={item.date}>
                                            <TableRowColumn colSpan="3">{formatDate(item.date)}</TableRowColumn>
                                            {
                                                item.status.map((each, index) => {
                                                    return (
                                                        <TableRowColumn key={index}>
                                                            <span onClick={() => openDetail(each, item.date, index)}>
                                                                {each ? '预' : '未'}
                                                            </span>
                                                        </TableRowColumn>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                }
                                return null;
                            }) :
                            searchData[0].plan.map(item => {
                                return (
                                    <TableRow key={item.date}>
                                        <TableRowColumn colSpan="3">{formatDate(item.date)}</TableRowColumn>
                                        {
                                            item.status.map((each, index) => {
                                                return (
                                                    <TableRowColumn key={index}>
                                                        <span onClick={() => openDetail(each, item.date, index)}>
                                                            {each ? '预' : '未'}
                                                        </span>
                                                    </TableRowColumn>
                                                );
                                            })
                                        }
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                    </Table>
                }
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);