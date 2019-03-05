import React from 'react';
import SettingsForm from './SettingsForm';

export default class ModalCalcSettings extends React.Component {
    render() {
    //    console.log(this.props.calcData);
        return (
            this.props.logged_in
            ?
            <SettingsForm initialData={this.props.calcData} handleCancel={this.props.handleCancel} reload={this.props.reload} />
            :
            <div><code>You don't have permission to configure the calculator.
            <br /><hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />Please login</code></div>
        );
    }
}