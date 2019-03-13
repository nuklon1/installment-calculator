import axios from 'axios';
import * as types from './actionTypes';

export function updateSuccess(settings) {
    return {
        type: types.SETTINGS_UPDATE_SUCCESS,
        settings
    }
}

export function updateSettings(newSettings) {
    let url = '/routes/settings';
    
    return (dispatch) => {
        axios.post(url, newSettings)
            .then(response => {
                console.log('Success:', response);

                if (response.data.type === 'success') {
                    dispatch(updateSuccess({}));
                    setTimeout(() => {
                        dispatch(updateSuccess(response.data.data.body));
                    }, 500);
                } else {
                    alert(response.data.data.text);
                }
            })
            .catch(error => console.error('Error in settingsAction:', error));
    }
}

export function getSuccess(settings) {
    return {
        type: "SETTINGS_GET_SUCCESS",
        settings
    }
}

export function getSettings(url) {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(settings => dispatch(getSuccess(settings)))
            .catch((error)=>{
                console.error('Ошибочка333!!!444... ', error);
            });
    }
}
