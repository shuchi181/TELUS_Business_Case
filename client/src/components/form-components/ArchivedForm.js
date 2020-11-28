import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clearUser } from '../../actions/user';
import { getForm, clearForm } from '../../actions/form';

import { Form, Container, Button, Col, Row } from 'react-bootstrap';

const ArchivedForm = ({
    form: { form },
    getForm,
    clearForm,
    clearUser,
    history,
    match
}) => {

    useEffect(() => {
        if(!form) getForm(match.params.formId);
    }, [form, match.params.formId, getForm]);

    const onClickBack = () => {
        clearForm();
        clearUser();
        history.goBack();
    }

    return form && (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form className="mt-4 mb-4">
                        <Form.Group controlId="formDescription" className="p-3 rounded bg-white">
                            <Form.Text className="mb-2"><h1 className="display-4">{form.title || ''}</h1></Form.Text>
                            <Form.Text><h4>{form.description || ''}</h4></Form.Text>
                        </Form.Group>
                        <Form.Group controlId="textForm" className="p-3 rounded bg-white">
                            <Form.Label>Short Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{form.shortTextTitle || ''}</Form.Text>
                            <Form.Control type="text" placeholder="Short answer text" />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Long Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{form.longTextTitle || ''}</Form.Text>
                            <Form.Control as='textarea'/>
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Multiple Choice</Form.Label>
                            <Form.Text className="mb-2 lead">{form.multipleChoiceTitle || ''}</Form.Text>
                            {form.multipleChoice.multipleChoiceOptions && form.multipleChoice.multipleChoiceOptions.length > 0 && (
                                form.multipleChoice.multipleChoiceOptions.map((value, key) => (
                                    <Form.Row key={key}>
                                        <Col>
                                            <Form.Check name="radioName" label={value} type="radio"/>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Checkbox</Form.Label>
                            <Form.Text className="mb-2 lead">{form.checkbox.checkboxTitle}</Form.Text>
                            {form.checkbox.checkboxOptions && form.checkbox.checkboxOptions.length > 0 && (
                                form.checkbox.checkboxOptions.map((value, key) => (
                                    <Form.Row key={key}>
                                        <Col>
                                            <Form.Check label={value} type="checkbox"/>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Dropdown</Form.Label>
                            <Form.Text className="mb-2 lead">{form.dropdown.dropdownTitle}</Form.Text>
                            <Form.Control className="mb-2" as="select">
                                <option selected disabled>Select One</option>
                                {form.dropdown.dropdownOptions && form.dropdown.dropdownOptions.length > 0 && (
                                    form.dropdown.dropdownOptions.map((value, key) => (
                                        <option>{value}</option>
                                    ))
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button type="button" variant="secondary" onClick={() => onClickBack()}>Back</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

ArchivedForm.propTypes = {
    form: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired,
    getForm: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    form: state.form
});

export default connect(mapStateToProps, { getForm, clearForm, clearUser })(ArchivedForm);