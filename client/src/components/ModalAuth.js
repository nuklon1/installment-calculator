import React from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as sessionActions from '../actions/sessionActions';
import {Form, Icon, Input, Button} from 'antd';
  
const credentials = {
    userName: 'nuklon',
    password: 'pass'
}


class NormalLoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
                if (values.userName === credentials.userName 
                 && values.password === credentials.password) {
                    this.props.actions.logInUser(values);
                    this.props.handleCancel();
                } else {
                    console.log('Wrong data. Please try again');
                }
            } else {
                console.log('Error occurred: ', err);
            }
        });
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>                    
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>Log in</Button>
                </Form.Item>
            </Form>
        );
    }
}
  
const ModalAuth = Form.create({ name: 'normal_login' })(NormalLoginForm);

function mapDispatchToProps(dispatch) {  
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ModalAuth);