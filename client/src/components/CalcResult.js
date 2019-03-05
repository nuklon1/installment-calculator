/**
 * Результат расчета калькулятора
 */

import React from 'react';
import { Icon } from 'antd';

const CalcResult = (props) => {
    const { totalCost, cost1Sqm, remainder, pmPerMonth/*, totalDefaultCost*/ } = props.result;
    return (
        props.state
            ?
            <div id="calc-result">
                <p>Total Cost:<br /><b>{number_format(totalCost, 0, '.', ' ')}</b> rub</p>
                <p>The Cost of 1 sq.m:<br /><b>{number_format(cost1Sqm, 0, '.', ' ')}</b> rub</p>
                <p>Remainder:<br /><b>{remainder < 0 ? '-' : number_format(remainder, 0, '.', ' ')}</b> rub</p>
                <p>Payment per month:<br /><b>{pmPerMonth < 0 ? '-' : number_format(pmPerMonth, 0, '.', ' ')}</b> rub</p>
            </div>
            :
            <div id="calc-result"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <Icon type="calculator" style={{ fontSize: '700%', color: '#20252d' }} />
            </div>
    );
};


function number_format( number, decimals, dec_point, thousands_sep ) {
    // 
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfix by: Michael White (http://crestidg.com)

    let i, kw, kd;

    // input sanitation & defaults
    if( isNaN(decimals === Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point === undefined ){
        dec_point = ",";
    }
    if( thousands_sep === undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
    kw = i.split( /(?=(?:\d{3})+$)/ ).join( thousands_sep );
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

    return kw + kd;
};



export default CalcResult;