/**
 * Главный интерфейс калькулятора
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/sessionActions';

import { Modal, Card, Icon, Select, /*Checkbox, */Button } from 'antd';
import PeriodStep from '../components/Period';
import FeeStep from '../components/Fee';

// Библиотека для расчетов
import Calculate from '../Calculate';

// Компонент для вывода результатов
import CalcResult from '../components/CalcResult';
//import ErrorBoundary from '../containers/ErrorBoundary';
import ModalContent from '../components/ModalContent';

const Option = Select.Option;
 
class CalcInterface extends Component {    
    state = {
        disabledArea: true,
        disabledSubmit: true,
    //    disabledSettings: true,
        selected: {
            floor: 0,
            room: 0,
            area: 0
        },
        months: 1,
        areaOptions: [],
        areaOptionsDefaultValue: 'Apartment Area...',
        mcChecked: false,
        fee: 100000,
        maxfee: null,
        result: {
            totalCost: null,
            cost1Sqm: null,
            remainder: null,
            pmPerMonth: null,
            totalDefaultCost: null,
        },
        // если null, то область результата пустая
        resultState: false,
        modal: {
            visible: false,
            componentName: '',
            title: '',
            width: '100%',
            calcData: {}
        },
        calcProps: this.props.data,
        calculate: new Calculate(this.props.data)
    }

    period = () => {
        let currentDate = new Date();
        let periodEnd = new Date(this.props.data.period);
        let remaining;

        if (periodEnd - currentDate > 0) {
            remaining = periodEnd.getMonth() - currentDate.getMonth() + ( 12 * ( periodEnd.getFullYear() - currentDate.getFullYear() ) );
        } else {
            remaining = 12; // default period = 12 months
        }
        
        return remaining;
    }


    renderAreaSelect = (room) => {    
        if (room.length) {
            return <Select value={this.state.areaOptionsDefaultValue} size='large' style={{ width: '100%' }} 
                    onChange={this.handleSelectChange.bind(null, 'area')} 
                    disabled={this.state.disabledArea}>
                {room.map(key =><Option key={key}>{key}</Option>)}
            </Select>
        } else {
            return <Select 
                defaultValue="Apartment Area..." value="Apartment Area..." 
                size='large' 
                style={{ width: '100%' }} 
                onChange={this.handleSelectChange.bind(null, 'area')} 
                disabled={this.state.disabledArea}>
            </Select>
        }
    }

    maxFee = () => {
        let maxfee = 
                Math.floor(
                    this.state.calculate.cost(this.state.selected.floor, this.state.months, this.state.selected.area) / this.state.calcProps.minfee 
                ) * this.state.calcProps.minfee
                || this.state.calcProps.minfee;

        this.setState({
            maxfee
        });        
    }


    handleSelectChange = (formField, value) => {
     
        this.state.selected[formField] = value;

        if (formField === 'room') {
            const roomKeys = Object.keys(this.props.data.rooms);
        //    if (roomKeys.indexOf(value) > -1) {
            if (~roomKeys.indexOf(value)) {
                this.setState({
                    disabledArea: false,
                    disabledSubmit: false,
                    areaOptions: this.props.data.rooms[value].split(',')
                });
            } else {
                this.setState({
                //    disabledArea: true,
                    disabledSubmit: true,
                    areaOptions: [],
                    areaOptionsDefaultValue: 'Apartment Area...'
                });
            }
        }

        if (formField === 'area') {
            this.setState({
                areaOptionsDefaultValue: value
            });
        }

        this.maxFee();
    }


    handleInputChange = (formField, value) => {
        this.state[formField] = value;

        if (formField === 'months')
            this.maxFee();
    }

    onClick = () => {
        let totalCost = this.state.calculate.cost(this.state.selected.floor, this.state.months, this.state.selected.area);

        this.setState({
            result: {
                totalCost,
                cost1Sqm: this.state.calculate.costSqM(this.state.selected.floor, this.state.months),
                remainder: this.state.calculate.reminder(totalCost, this.state.fee),
                pmPerMonth: this.state.calculate.pmPerMonth(totalCost, this.state.months, this.state.fee),
            //    totalDefaultCost: this.state.calculate.defaultTotalCost(this.state.selected.floor, this.state.selected.area)
            },
            resultState: true
        });

    }

    showModal = (value) => {
        let _title = '';
        let _modalWidth = '100%';
        let _calcData = {};
        switch (value) {
            case 'ModalAuth':
                _title = 'Login';
                _modalWidth = '300px';
                break;        
            case 'ModalCalcSettings':
                _title = 'Calculator Setting';
                _calcData = this.state.calcProps
                break;
            default:
                break;
        }

        this.setState({
            modal: {
                visible: true,
                componentName: value,
                title: _title,
                width: _modalWidth,
                calcData: _calcData
            }
        });
    }

    handleCancel = () => {
        this.setState({
            modal: {
                visible: false,
                componentName: '',
                title: '',
                width: '100%'
            }
        });
    }

    logOut = (e) => {
        e.preventDefault();
        this.props.actions.logOutUser();
    }


    render() {
        let authIcon = undefined;

        if (this.props.logged_in) {
            authIcon = <Icon type="logout" onClick={this.logOut.bind(null)} />
        } else {
            authIcon = <Icon type="user" onClick={this.showModal.bind(null, 'ModalAuth')} />
        }

        const roomList = {
            'studio': 'Студия',
            'one': '1к.кв.',
            'two': '2к.кв.',
            'three': '3к.кв.',
            'four': '4к.кв.'
        };

        const roomKeys = Object.keys(this.props.data.rooms);

        return (
            <div className="container">
                <Card className="box-shadow" bordered={false} style={{ width: 400, marginTop: 16, backgroundColor: '#262c36' }} 
                    actions={[
                        <Icon type="setting" onClick={this.showModal.bind(null, 'ModalCalcSettings')} />, 
                        <Icon type="edit" />, 
                        authIcon
                    ]}
                >
                    <Select defaultValue="Floor..." size="large" style={{ width: '100%' }} name="floor" onChange={this.handleSelectChange.bind(null, 'floor')}>
                        {[...Array(this.props.data.floor + 1)].map((key, floor) => <Option value={floor} key={floor}>{(floor === 0) ? 'Floor...' : `${floor} fl.`}</Option>)}
                    </Select>

                    <Select defaultValue="Rooms..." size='large' style={{ width: '100%' }} onChange={this.handleSelectChange.bind(null, 'room')}>
                        {[...Array(roomKeys.length + 1)]
                            .map((key, room) => 
                                <Option value={(room === 0) ? 0 : roomKeys[room - 1]} key={room}>{(room === 0) ? 'Rooms...' : roomList[roomKeys[room - 1]]}</Option>
                        )}
                    </Select>

                    <Select defaultValue="Areas..." value={this.state.areaOptionsDefaultValue} size='large' style={{ width: '100%' }} onChange={this.handleSelectChange.bind(null, 'area')} disabled={this.state.disabledArea}>
                        {this.state.areaOptions.map(key =><Option key={key}>{key}</Option>)}
                    </Select> 

                    <PeriodStep 
                        period={this.period()} 
                        periodValue={this.state.months} 
                        handleInputChange={this.handleInputChange.bind(null, 'months')} 
                        maxFee={this.maxFee.bind(null, 'period')}
                    />

                    <FeeStep 
                        fee={this.state.fee}
                        minfee={this.props.data.minfee} 
                        maxfee={this.state.maxfee}
                        handleInputChange={this.handleInputChange.bind(null, 'fee')} 
                    />

                    <Button type="primary" 
                        size='large' 
                        style={{ width: '100%', marginTop: '1rem' }} 
                        onClick={this.onClick}>
                        Calculate
                    </Button>

                </Card>
                <CalcResult result={this.state.result} state={this.state.resultState} />

                <Modal
                    title={this.state.modal.title}
                    visible={this.state.modal.visible}
                    onCancel={this.handleCancel}
                    style={{ maxWidth: this.state.modal.width }}
                    footer={null}
                >
                    <ModalContent 
                        componentName={this.state.modal.componentName} 
                        handleCancel={this.handleCancel.bind(null)} 
                        logged_in={this.props.logged_in}
                        calcData={this.state.modal.calcData}
                        reload={this.props.reload}
                    />
                </Modal>
            </div>
        );
    }
}


CalcInterface.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
//    console.log(ownProps);
    return {
        logged_in: state.session
    };
}

function mapDispatchToProps(dispatch) {
//    console.log(dispatch);
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalcInterface);