import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getSettings } from './actions/settingsAction';

import CalcInterface from './containers/CalcInterface';

import 'antd/dist/antd.css';
import './App.css';
import { Icon } from 'antd';


class App extends Component {

    loadSettings = (url) => {
        this.props.fetchData(url);
    }

    componentDidMount() {
        this.loadSettings('/routes/settings');
    }

    render() {
        return (            
            <div className="App">
                <section className="App-body">
                    <h1 style={{fontSize: '250%'}}>Real estate installment calculator</h1>
                    <div>
                        {
                            (Object.keys(this.props.settings).length === 0)
                            ? 
                            <Icon type="loading" style={{ fontSize: "5rem" }} />
                            :
                            <CalcInterface data={this.props.settings} reload={this.loadSettings} />                            
                        }
                    </div>
                    <span style={{ marginTop: '1rem' }}>
                        Login to set up a calculator
                    </span>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: url => dispatch(getSettings(url))
    //    fetchData: bindActionCreators(settingsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
