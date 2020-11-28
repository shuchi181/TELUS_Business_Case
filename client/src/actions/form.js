import api from 'axios';

import {
    GET_FORM,
    UPDATE_FORM,
    CREATE_FORM,
    GET_FORM_RESPONSES,
    CLEAR_FORM
} from './types';

/* GET FORM */
export const getForm = (formId) => async dispatch => {
    try {
        const res = await api.get(`/form/${formId}`);

        dispatch({
            type: GET_FORM,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

/* CREATE FORM */
export const createForm = (formData) => async dispatch => {
    try {
        const res = await api.post('/form/create-form', formData);

        dispatch({
            type: CREATE_FORM,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
        console.log("Error in action");
    }
};

/* UPDATE FORM */
export const updateForm = (formId, formData) => async dispatch => {
    try {
        await api.post(`/form/update-form/${formId}`, formData);

        dispatch({ type: UPDATE_FORM });
    } catch (err) {
        console.error(err);
    }
}

/* SAVE FORM RESPONSE */
export const formResponse = (formId, formData) => async dispatch => {
    try {
        await api.post(`/form/form-response/${formId}`, formData);
    } catch (err) {
        console.error(err);
    }
};

/* GET FORM RESPONSES */
export const getFormResponses = (formId) => async dispatch => {
    try {
        const res = await api.get(`/form/get-form-responses/${formId}`);

        dispatch({
            type: GET_FORM_RESPONSES,
            payload: res.data
        })
    } catch (err) {
        
    }
};

export const clearForm = () => dispatch => dispatch({ type: CLEAR_FORM });