import api from '../utils/api';

import {
    GET_FORMS,
    GET_PUBLISHED_FORMS,
    GET_FORMS_ERROR
} from './types';

/* GET FORMS */
export const getForms = () => async dispatch => {
    try {
        const res = await api.get('/user/forms');

        dispatch({
            type: GET_FORMS,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

/* GET PUBLISHED FORMS */
export const getPublishedForms = () => async dispatch => {
    try {
        const res = await api.get('/user/published-forms');

        dispatch({
            type: GET_PUBLISHED_FORMS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};