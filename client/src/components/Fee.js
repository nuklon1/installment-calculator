/**
 * Слайдер первоначального взноса
 */

import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
  
class FeeStep extends Component {

    state = {
        inputValue: this.props.minfee// || this.props.fee
    }

    onChange = (value) => {
        this.setState({
            inputValue: value
        });
        this.props.handleInputChange(value);
    }
  
    render() {
        const { inputValue } = this.state || this.props.fee;
        const { minfee, maxfee } = this.props;  // , fee
        return (
            <div>
                <Row>
                    <Col span={21} style={{ textAlign: 'left' }}>Down Payment (min: {minfee} rub)</Col>
                </Row>
                <Row>
                    <Col span={17}>
                        <Slider
                            min={minfee}
                            max={maxfee}
                            step={100000}
                            onChange={this.onChange}
                            value={typeof inputValue === 'number' ? inputValue : this.props.minfee}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={minfee}
                            max={maxfee}
                            step={100000}
                            style={{ marginLeft: 14, width: 90 }}
                            value={inputValue}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FeeStep;