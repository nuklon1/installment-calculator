import React from 'react';
import {bindActionCreators} from 'redux'; 
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import * as settingsAction from '../actions/settingsAction';

const TabPane = Tabs.TabPane;

class SettingsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            floor: this.props.initialData.floor
        };
    }

    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.fetchData.updateSettings(values);
            }
        });
        e.preventDefault();
    }

    add = () => {
        if (this.state.floor < 20)
            this.setState({
                floor: this.state.floor + 1
            });
    }

    remove = () => {
        if (this.state.floor > 1)
            this.setState({
                floor: this.state.floor - 1
            });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const dateFormat = 'YYYY-MM-DD';

        return (
            <Form onSubmit={(e) => this.handleSubmit(e)} className="settings-form">

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Main" key="1">                        
                        <Form.Item label="The initial contribution (rub)">
                            {getFieldDecorator('minfee', {
                                initialValue: this.props.initialData.minfee,
                                rules: [{ required: true, message: 'Please put the initial contribution' }]
                            })(
                                <Input placeholder="The minimum initial contribution" />
                            )}
                        </Form.Item>
                        <Form.Item label="Monthly change in the cost of an apartment (rub)">
                            {getFieldDecorator('priceChangePerMonth', {
                                initialValue: this.props.initialData.priceChangePerMonth,
                                rules: [{ required: true, message: 'Please put the minimum value of the installment dynamics for 1 month' }]
                            })(
                                <Input placeholder="Price indexation every month" onChange={this.onChange} />                                
                            )}
                            <small>how much will the price of an apartment increase each month, for example, by 100 rub</small>
                        </Form.Item>
                        <Form.Item label="Installment period">
                            {getFieldDecorator('period', {
                                initialValue: moment(this.props.initialData.period, dateFormat),
                                rules: [{ required: true, message: 'Please put the installment period' }]
                            })(                                
                                <DatePicker format={dateFormat} placeholder='Choose the end date of the installment' />
                            )}
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Apartment areas" key="2">
                        <p>You must specify the area at least one of the options for apartments</p>
                        <p><code>eg, for 1b-ap. [ 40, 45.4, 47.8, 50.3 ]</code></p>
                        <Form.Item label="Studio">
                            {getFieldDecorator('rooms[studio]', {
                                initialValue: this.props.initialData.rooms.studio
                            })(
                                <Input placeholder="Write the area separated by commas" />
                            )}
                        </Form.Item>
                        <Form.Item label="1b-ap.">
                            {getFieldDecorator('rooms[one]', {
                                initialValue: this.props.initialData.rooms.one
                            })(
                                <Input placeholder="Write the area separated by commas" />
                            )}
                        </Form.Item>
                        <Form.Item label="2b-ap.">
                            {getFieldDecorator('rooms[two]', {
                                initialValue: this.props.initialData.rooms.two
                            })(
                                <Input placeholder="Write the area separated by commas" />
                            )}
                        </Form.Item>
                        <Form.Item label="3b-ap.">
                            {getFieldDecorator('rooms[three]', {
                                initialValue: this.props.initialData.rooms.three
                            })(
                                <Input placeholder="Write the area separated by commas" />
                            )}
                        </Form.Item>
                        <Form.Item label="4b-ap.">
                            {getFieldDecorator('rooms[four]', {
                                initialValue: this.props.initialData.rooms.four
                            })(
                                <Input placeholder="Write the area separated by commas" />
                            )}
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Prices by floor" key="3">

                    <Form.Item>
                        <Button type="dashed" onClick={this.add} style={{ width: '50%' }}>
                            <Icon type="plus" /> Add field
                        </Button>
                        <Button type="dashed" onClick={this.remove} style={{ width: '50%' }}>
                            <Icon type="minus" /> Remove field
                        </Button>
                    </Form.Item>

                    <b>The cost of 1 sq.m on floors (rub)</b>

                    {   
                        [...Array(this.state.floor)]
                            .map((key, floor) => 
                                <Form.Item key={floor+1} label={`on ${floor+1} floor`}>
                                    {getFieldDecorator(`prices[${floor+1}]`, {
                                        initialValue: this.props.initialData.prices[floor] ? +this.props.initialData.prices[floor] : '',
                                        rules: [{ required: true, message: `Please put the cost of 1 sq.m on ${floor+1} floor` }]
                                    })(
                                        <Input key={floor+1} placeholder={`The cost of 1 sq.m on ${floor+1} floor`} />
                                    )}
                                </Form.Item>)
                            .reverse()
                    }
                    </TabPane>
                </Tabs>

                <Form.Item>                    
                    <Button type="primary" htmlType="submit" className="settings-form-button" style={{ width: '100%' }}>Save</Button>
                </Form.Item>

            </Form>
        );
    }
}

const SettingsFormCreate = Form.create({ name: 'settings_form' })(SettingsForm);

const mapStateToProps = (state) => {
    return {
        initialData: state.settings,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: bindActionCreators(settingsAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsFormCreate);