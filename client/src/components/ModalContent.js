/**
 * Общий компонент для контента модальных окон
 */

import React from 'react';
//import ErrorBoundary from '../containers/ErrorBoundary';

const MODAL_CONTENTS = {
    ModalAuth: require('./ModalAuth.js').default,
    ModalCalcSettings: require('./ModalCalcSettings').default
}

const ModalContent = (props) => {
    const MContent = MODAL_CONTENTS[props.componentName];
    return (
        MODAL_CONTENTS.hasOwnProperty(props.componentName)
        ?
        <MContent handleCancel={props.handleCancel} logged_in={props.logged_in} calcData={props.calcData} reload={props.reload} />
        :
        <div>Компонент <b>{props.componentName}</b> не определен</div>
    );
  
}

export default ModalContent;