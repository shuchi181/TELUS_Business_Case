import {
    GET_FORMS,
    GET_FORMS_ERROR,
    PUBLISH_FORM,
    GET_PUBLISHED_FORMS,
    GET_NOTIFICATIONS,
    RESET_NOTIFICATIONS
} from '../actions/types';

const initialState = {
    forms: null,
    publishedForms: null,
    notifications: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_FORMS:
            return {
                ...state,
                forms: payload,
                loading: false
            };
        case PUBLISH_FORM:
            return {
                ...state,
                forms: payload[0],
                publishedForms: payload[1],
                loading: false
            }
        case GET_PUBLISHED_FORMS:
            return {
                ...state,
                publishedForms: payload,
                loading: false
            }
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                loading: false
            }
        case RESET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                loading: false
            }
        case GET_FORMS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: 
            return state;
    }
}