import api from 'axios';

import {
    GET_FORM,
    UPDATE_FORM,
    FORM_UPDATE_ERROR
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

/* UPDATE FORM */
export const updateForm = (formId, formData) => async dispatch => {
    try {
        const res = await api.post(`form/update-form/${formId}`, formData);

        dispatch({
            type: UPDATE_FORM,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
}