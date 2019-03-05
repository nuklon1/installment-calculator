import {combineReducers} from 'redux';
//import modal from './modalReducer';
import session from './sessionReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
//    modal,
    settings,
    session    
})

export default rootReducer; 