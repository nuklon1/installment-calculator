/**
 * Слайдер периода рассрочки
 */

import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
  
class PeriodStep extends Component {

    state = {
        inputValue: 1
    }

    onChange = (value) => {
        this.setState({
            inputValue: value
        });
        this.props.handleInputChange(value);
    }
    
    render() {
        const { inputValue } = this.state;
        return (
            <div>
                <Row>
                    <Col span={21} style={{ textAlign: 'left' }}>Installment period (months)</Col>
                </Row>
                <Row>
                    <Col span={17}>
                        <Slider
                            min={1}
                            max={this.props.period}
                            onChange={this.onChange}
                            value={typeof inputValue === 'number' ? inputValue : 1}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={this.props.period}
                            style={{ marginLeft: 14 }}
                            value={inputValue}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PeriodStep;