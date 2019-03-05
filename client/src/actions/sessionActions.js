import * as types from './actionTypes';  
import sessionApi from '../api/SessionApi';

export function loginSuccess() {  
    return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {
    return async (dispatch) => {
        try {
            const login = await sessionApi.login(credentials);
            await sessionStorage.setItem('jwt', login.jwt);
            await dispatch(loginSuccess());
        } catch (error) {
            console.error(`Login error: ${error}`);
        }
    }    
}

export function logOutUser() {
    sessionStorage.removeItem('jwt');
    return {type: types.LOG_OUT}
}