import api from '../utils/api';

import {
    GET_FORMS,
    GET_PUBLISHED_FORMS,
    PUBLISH_FORM,
    GET_NOTIFICATIONS,
    RESET_NOTIFICATIONS,
    CLEAR_USER,
    GET_ARCHIVED_FORMS
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

/* PUBLISH FORM */
export const publishForm = (formId) => async dispatch => {
    try {
        const res = await api.post(`/user/publish-form/${formId}`);

        dispatch({
            type: PUBLISH_FORM,
            payload: res.data
        });

    } catch (err) {
        console.error(err);
    }
}

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

/* GET NOTIFICATIONS */
export const getNotifications = () => async dispatch => {
    try {
        const res = await api.get('/user/get-notifications');

        dispatch({
            type: GET_NOTIFICATIONS,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
};
/* Reset Notifications */
export const resetNotifications = () => async dispatch => {
    try {
        const res = await api.post('/user/reset-notifications');

        dispatch({
            type: RESET_NOTIFICATIONS,
            payload: res.data
        });

    } catch (err) {
        console.error(err);
    }
};

export const archiveForm = (formId) => async dispatch => {
    try {
        await api.post(`/user/archive-form/${formId}`);
    } catch (err) {
        console.error(err);
    }
};

export const getArchivedForms = () => async dispatch => {
    try {
        const res = await api.get('/user/archived-forms');

        dispatch({
            type: GET_ARCHIVED_FORMS,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

/* Clear user */
export const clearUser = () => dispatch => dispatch({ type: CLEAR_USER });