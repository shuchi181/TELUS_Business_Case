import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row, Col, Table } from 'react-bootstrap';

import { getFormResponses } from '../../actions/form';

const ResponseView = ({ form: { responses }, getFormResponses, match }) => {

    useEffect(() => {
        if(!responses) getFormResponses(match.params.formId);
    }, [responses, getFormResponses, match.params.formId]);

    return responses && (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Short Text Response</th>
                    <th>Long Text Response</th>
                    <th>Multiple Choice Response</th>
                    <th>Checkbox Response</th>
                    <th>Dropdown Response</th>
                </tr>
            </thead>
            <tbody>
                {responses.length > 0 ? (
                    responses.map(response => (
                        <tr>
                            <td>{response.shortTextResponse}</td>
                            <td>{response.longTextResponse}</td>
                            <td>{response.multipleChoiceResponse}</td>
                            <td>{response.checkboxResponse}</td>
                            <td>{response.dropdownResponse}</td>
                        </tr>
                    ))
                ) : (
                    <h2>No responses yet...</h2>
                )}
            </tbody>
        </Table>
    );
}

ResponseView.propTypes = {
    form: PropTypes.object.isRequired,
    getFormResponses: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    form: state.form
})

export default connect(mapStateToProps, { getFormResponses })(ResponseView);