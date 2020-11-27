import {
    GET_FORM,
    UPDATE_FORM,
    CREATE_FORM,
    FORM_UPDATE_ERROR,
    GET_FORM_RESPONSES
} from '../actions/types';

const initialState = {
    form: null,
    loadng: true,
    responses: null,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_FORM:
            return {
                form: payload,
                loading: false
            }
        case UPDATE_FORM:
        case CREATE_FORM:
            return {
                form: payload,
                loading: false
            }
        case GET_FORM_RESPONSES:
            return {
                responses: payload,
                loading: false
            }
        case FORM_UPDATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}