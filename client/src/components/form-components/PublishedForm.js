import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getForm, formResponse, clearForm } from '../../actions/form';
import { clearUser } from '../../actions/user';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const initResponseState = {
    shortTextValue: '',
    longTextValue: '',
    multipleChoiceValue: '',
    checkboxValues: [],
    dropdownValue: ''
};

const PublishedForm = ({
    form: { form, loading },
    getForm,
    formResponse,
    clearForm,
    clearUser,
    match,
    history
}) => {
    const [formData, setFormData] = useState(initResponseState);
    
    useEffect(() => {
        if(!form) {
            getForm(match.params.formId);
            console.log("Get Form Called");
        };
    }, [form, match.params.formId, getForm, loading]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCheckboxChange = (e) => {
        const options = [...formData.checkboxValues];
        let index;
        if(e.target.checked){
            options.push(e.target.value);
        } else {
            index = options.indexOf(e.target.value);
            options.splice(index, 1);
        }

        setFormData({ ...formData, checkboxValues: options });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        formResponse(match.params.formId, formData);
        clearForm();
        clearUser();
        history.goBack();
    }

    return form !== null && (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form className="mt-4 mb-4" onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formDescription" className="p-3 rounded bg-white">
                            <Form.Text className="mb-2"><h1 className="display-4">{form.title || ''}</h1></Form.Text>
                            <Form.Text><h4>{form.description || ''}</h4></Form.Text>
                        </Form.Group>
                        <Form.Group controlId="textForm" className="p-3 rounded bg-white">
                            <Form.Label>Short Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{form.shortTextTitle || ''}</Form.Text>
                            <Form.Control type="text" placeholder="Short answer text" name="shortTextValue" value={formData.shortTextValue || ''} onChange={e => onChange(e)} />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Long Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{form.longTextTitle || ''}</Form.Text>
                            <Form.Control as='textarea' name="longTextValue" value={formData.longTextValue || ''} onChange={e => onChange(e)}/>
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Multiple Choice</Form.Label>
                            <Form.Text className="mb-2 lead">{form.multipleChoice.multipleChoiceTitle || ''}</Form.Text>
                            {form.multipleChoice.multipleChoiceOptions && form.multipleChoice.multipleChoiceOptions.length > 0 && (
                                form.multipleChoice.multipleChoiceOptions.map((value, key) => (
                                    <Form.Row key={key}>
                                        <Col>
                                            <Form.Check label={value} name="multipleChoiceValue" value={value} type="radio" onChange={e => onChange(e)}/>
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
                                            <Form.Check label={value} value={value} name="checkboxValues" type="checkbox" onChange={e => onCheckboxChange(e)}/>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Dropdown</Form.Label>
                            <Form.Text className="mb-2 lead">{form.dropdown.dropdownTitle}</Form.Text>
                            <Form.Control className="mb-2" as="select" name="dropdownValue" onChange={e => onChange(e)}>
                                <option selected disabled>Select One</option>
                                {form.dropdown.dropdownOptions && form.dropdown.dropdownOptions.length > 0 && (
                                    form.dropdown.dropdownOptions.map((value, key) => (
                                        <option value={value} key={key}>{value}</option>
                                    ))
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button type="submit">Submit Form</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

PublishedForm.propType = {
    form: PropTypes.object.isRequired,
    getForm: PropTypes.func.isRequired,
    formResponse: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
}

const mapStateToProp = state => ({
    form: state.form
});

export default connect(mapStateToProp, { getForm, formResponse, clearForm, clearUser })(PublishedForm);