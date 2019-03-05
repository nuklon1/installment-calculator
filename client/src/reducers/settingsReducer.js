import * as types from '../actions/actionTypes';
import initialState from './initialState'; 

export default function settings(state = initialState.settings, action) {
    switch (action.type) {
        case types.SETTINGS_UPDATE_SUCCESS:
            return action.settings;   
        case types.SETTINGS_GET_SUCCESS:
            return action.settings;
        default: 
            return state;
    }
}
