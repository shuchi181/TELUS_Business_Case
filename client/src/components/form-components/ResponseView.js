import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Row, Button, Container } from 'react-bootstrap';

import { getFormResponses, clearForm } from '../../actions/form';

const ResponseView = ({
    form: { responses },
    getFormResponses,
    clearForm,
    match,
    history 
}, ) => {

    useEffect(() => {
        if(!responses) getFormResponses(match.params.formId);
    }, [responses, getFormResponses, match.params.formId]);

    const onGoBack = () => {
        clearForm();
        history.push("");
    }

    return responses && responses.length > 0 ? (
        <Container fluid className="p-4">
            <Table striped bordered>
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
                    {responses.length > 0 && (
                        responses.map((response,key) => (
                            <tr key={key}>
                                <td>{response.shortTextResponse}</td>
                                <td>{response.longTextResponse}</td>
                                <td>{response.multipleChoiceResponse}</td>
                                <td>{response.checkboxResponse}</td>
                                <td>{response.dropdownResponse}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <Row className="mt-4 ml-1">
                <Button type="button" variant="secondary" onClick={() => onGoBack()}>Go Back</Button>
            </Row>
        </Container>
    ) : (
        <Container fluid className="p-4">
            <h3>No responses yet...</h3>
            <Row className="mt-4 ml-1">
                <Button type="button" variant="secondary" onClick={() => onGoBack()}>Go Back</Button>
            </Row>
        </Container>
    );
}

ResponseView.propTypes = {
    form: PropTypes.object.isRequired,
    getFormResponses: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    form: state.form
})

export default connect(mapStateToProps, { getFormResponses, clearForm })(ResponseView);