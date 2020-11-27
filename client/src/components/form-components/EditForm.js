import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateForm, getForm } from '../../actions/form';
import { clearUser } from '../../actions/user';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import PreviewForm from './PreviewForm';

const initState = {
    title: '',
    description: '',
    shortTextTitle:  '',
    longTextTitle: '',
    multipleChoiceTitle: '',
    multipleChoiceOptions: [],
    checkboxTitle: '',
    checkboxOptions: [],
    dropdownTitle: '',
    dropdownOptions: []
}

const EditForm = ({
    form: { form, loading },
    updateForm,
    getForm,
    clearUser,
    match,
    history
}) => {

    const [formData, setFormData] = useState(initState);

    useEffect(() => {
        if(!form) {
            getForm(match.params.formId);
        }
        if(!loading && form) {
            const data = { ...initState };
            for(const key in form) {
                if(key in data) data[key] = form[key];
            }
            for(const key in form.multipleChoice){
                if(key in data) data[key] = form.multipleChoice[key];
            }
            for(const key in form.checkbox) {
                if(key in data) data[key] = form.checkbox[key];
            }
            for(const key in form.dropdown) {
                if(key in data) data[key] = form.dropdown[key];
            }
            setFormData(data);
        }
    }, [match.params.formId, form, getForm, loading]);
    // Preview
    const [showPreview, setShowPreview] = useState(false);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    /* Radio Button functions */
    const onRadioButtonChange = (e, key) => {
        let temp = [...formData.multipleChoiceOptions];
        temp[key] = e.target.value;
        setFormData({ ...formData, multipleChoiceOptions: temp });
    }
    const addRadioOption = () => {
        if(formData.multipleChoiceOptions){
            setFormData(
                { ...formData, multipleChoiceOptions: [...formData.multipleChoiceOptions, ""] }
            );
        } else {
            setFormData(
                { ...formData, multipleChoiceOptions: [""] }
            );
        }
    }
    const removeRadioOption = (key) => {
        let temp = [...formData.multipleChoiceOptions];
        temp.splice(key, 1);
        setFormData({ ...formData, multipleChoiceOptions: temp });
    }

    /* Checkbox functions */
    const onCheckboxChange = (e, key) => {
        let temp = [...formData.checkboxOptions];
        temp[key] = e.target.value;
        setFormData({ ...formData, checkboxOptions: temp });
    }

    const addCheckboxOption = () => {
        if(formData.checkboxOptions){
            setFormData(
                { ...formData, checkboxOptions: [...formData.checkboxOptions, ""] }
            );
        } else {
            setFormData({ ...formData, checkboxOptions: [""] });
        }
        
    }

    const removeCheckboxOption = (key) => {
        let temp = [...formData.checkboxOptions];
        temp.splice(key, 1);
        setFormData({ ...formData, checkboxOptions: temp });
    }
    /* Dropdown functions */
    const onDropdownChange = (e, key) => {
        let temp = [...formData.dropdownOptions];
        temp[key] = e.target.value;
        setFormData({ ...formData, dropdownOptions: temp });
    }

    const addDropdownOption = () => {
        if(formData.dropdownOptions) {
            setFormData(
                { ...formData, dropdownOptions: [...formData.dropdownOptions, ""] }
            );
        } else {
            setFormData(
                { ...formData, dropdownOptions: [""] }
            );
        }
        
    }

    const removeDropdownOption = (key) => {
        let temp = [...formData.dropdownOptions];
        temp.splice(key, 1);
        setFormData({ ...formData, dropdownOptions: temp });
    }

    /* On Submit */
    const onSubmit = (event) => {
        event.preventDefault();

        updateForm(match.params.formId, formData);
        clearUser();
        history.goBack();
    }

    const {
        title,
        description,
        shortTextTitle,
        longTextTitle,
        multipleChoiceTitle,
        multipleChoiceOptions,
        checkboxTitle,
        checkboxOptions,
        dropdownTitle,
        dropdownOptions
    } = formData;

    return form && !showPreview ? (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form className="mt-4 mb-4" onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formDescription" className="p-3 rounded bg-white">
                            <Form.Control className="mb-2" type="text" value={title} name="title" onChange={(e) => onChange(e)} />
                            <Form.Control type="text" value={description} name="description" onChange={(e) => onChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="textForm" className="p-3 rounded bg-white">
                            <Form.Label>Short Text Field</Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={shortTextTitle} name="shortTextTitle" onChange={(e) => onChange(e)} />
                            <Form.Control type="text" readOnly={true} placeholder="Short answer text" />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Long Text Field</Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={longTextTitle} name="longTextTitle" onChange={(e) => onChange(e)} />
                            <Form.Control as='textarea' readOnly={true} />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Multiple Choice</Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={multipleChoiceTitle} name="multipleChoiceTitle" onChange={(e) => onChange(e)} />
                            {multipleChoiceOptions && multipleChoiceOptions.length > 0 && (
                                multipleChoiceOptions.map((value, key) => (
                                    <Form.Row key={key} className="mb-2">
                                        <Col xs={4}>
                                            <Form.Check label={value} type="radio" disabled />
                                        </Col>
                                        <Col xs={7}>
                                            <Form.Control type="text" value={value || ''} onChange={(e) => onRadioButtonChange(e, key)} />
                                        </Col>
                                        <Col>
                                            <Button onClick={() => removeRadioOption(key)}>-</Button>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                            <Form.Row className="mt-4">
                                <Button onClick={() => addRadioOption()}>+</Button>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Checkbox</Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={checkboxTitle} name="checkboxTitle" onChange={(e) => onChange(e)} />
                            {checkboxOptions && checkboxOptions.length > 0 && (
                                checkboxOptions.map((value, key) => (
                                    <Form.Row key={key} className="mb-2">
                                        <Col xs={4}>
                                            <Form.Check label={value} type="checkbox" disabled />
                                        </Col>
                                        <Col xs={7}>
                                            <Form.Control type="text" value={value || ''} onChange={(e) => onCheckboxChange(e, key)} />
                                        </Col>
                                        <Col>
                                            <Button onClick={() => removeCheckboxOption(key)}>-</Button>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                            <Form.Row className="mt-4">
                                <Button onClick={() => addCheckboxOption()}>+</Button>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Dropdown</Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={dropdownTitle} name="dropdownTitle" onChange={(e) => onChange(e)} />
                            <Form.Control className="mb-2" as="select" defaultValue="Select" disabled>
                                {dropdownOptions && dropdownOptions.length > 0 && (
                                    dropdownOptions.map((value, key) => (
                                        <option key={key}>{value}</option>
                                    ))
                                )}
                            </Form.Control>
                            {dropdownOptions && dropdownOptions.length > 0 && (
                                dropdownOptions.map((value, key) => (
                                    <Form.Row key={key}  className="mb-2">
                                        <Col xs={1} className="text-center">
                                            <p>{key+1}.</p>
                                        </Col>
                                        <Col xs={10}>
                                            <Form.Control type="text" value={value || ''} onChange={(e) => onDropdownChange(e, key)} />
                                        </Col>
                                        <Col>
                                            <Button onClick={() => removeDropdownOption(key)}>-</Button>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                            <Form.Row className="mt-4">
                                <Button onClick={() => addDropdownOption()}>+</Button>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button className="mr-2" variant="secondary" type="button" onClick={() => history.goBack()}>Back</Button>
                            <Button className="mr-2" type="submit">Save Form</Button>
                            <Button type="button" onClick={() => setShowPreview(true)}>Preview Form</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) : (
        <PreviewForm formData={{ formData, setShowPreview }}/>
    );
}

EditForm.propTypes = {
    updateForm: PropTypes.func.isRequired,
    getForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    form: state.form
})

export default connect(mapStateToProps, { updateForm, getForm, clearUser })(EditForm);