import {
    GET_FORM,
    UPDATE_FORM,
    CREATE_FORM,
    FORM_UPDATE_ERROR,
    GET_FORM_RESPONSES,
    CLEAR_FORM
} from '../actions/types';

const initialState = {
    form: null,
    loading: true,
    responses: null,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_FORM:
            return {
                ...state,
                form: payload,
                loading: false
            };
        case UPDATE_FORM:
            return {
                ...state,
                form: null,
                loading: false
            }
        case CREATE_FORM:
            return {
                ...state,
                form: payload,
                loading: false
            }
        case GET_FORM_RESPONSES:
            return {
                ...state,
                responses: payload,
                loading: false
            }
        case FORM_UPDATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_FORM:
            return {
                ...state,
                form: null,
                responses: null,
                loading: false
            }
        default:
            return state;
    }
}