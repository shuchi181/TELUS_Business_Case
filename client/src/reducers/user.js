import {
    GET_FORMS,
    GET_FORMS_ERROR,
    GET_PUBLISHED_FORMS
} from '../actions/types';

const initialState = {
    forms: null,
    publishedForms: null,
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
            }
        case GET_PUBLISHED_FORMS:
            return {
                ...state,
                publishedForms: payload,
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