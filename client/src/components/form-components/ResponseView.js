import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Row, Button, Container } from 'react-bootstrap';

import { getFormResponses, clearForm } from '../../actions/form';

const ResponseView = ({
    form: { form, responses },
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

    return form && responses && responses.length > 0 ? (
        <Container fluid className="p-4">
            <Table striped bordered>
                <thead className="thead-dark text-center">
                    <tr>
                        <th>{form.shortTextTitle}</th>
                        <th>{form.longTextTitle}</th>
                        <th>{form.multipleChoice.multipleChoiceTitle}</th>
                        <th>{form.checkbox.checkboxTitle}</th>
                        <th>{form.dropdown.dropdownTitle}</th>
                    </tr>
                </thead>
                <tbody>
                    {responses.length > 0 && (
                        responses.map((response,key) => (
                            <tr key={key} className="text-center">
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