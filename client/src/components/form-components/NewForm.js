import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createForm, clearForm } from '../../actions/form';
import { clearUser } from '../../actions/user';

import { Container, Col, Row, Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

import PreviewForm from './PreviewForm';

import { AiOutlineQuestionCircle } from 'react-icons/ai';

const NewForm = ({
    createForm,
    clearUser,
    clearForm,
    history
}) => {
    // Preview
    const [showPreview, setShowPreview] = useState(false);

    const [formData, setFormData] = useState({
        title: 'Untitled Form',
        description: 'Form Description',
        shortTextTitle: '',
        longTextTitle: '',
        multipleChoiceTitle: '',
        multipleChoiceOptions: [],
        checkboxTitle: '',
        checkboxOptions: [],
        dropdownTitle: '',
        dropdownOptions: []
    });

    // Popover help
    const popover = (title, content) => {
        return (
            <Popover>
                <Popover.Title as="h3">{title}</Popover.Title>
                <Popover.Content>{content}</Popover.Content>
            </Popover>
        );
    }

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    /* Radio Button functions */
    const onRadioButtonChange = (e, key) => {
        let temp = [...formData.multipleChoiceOptions];
        temp[key] = e.target.value;
        setFormData({ ...formData, multipleChoiceOptions: temp });
    }
    const addRadioOption = () => {
        setFormData(prevState => (
            { ...formData, multipleChoiceOptions: [...prevState.multipleChoiceOptions, ""] }
        ));
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
        setFormData(prevState => (
            { ...formData, checkboxOptions: [...prevState.checkboxOptions, ""] }
        ));
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
        setFormData(prevState => (
            { ...formData, dropdownOptions: [...prevState.dropdownOptions, ""] }
        ));
    }

    const removeDropdownOption = (key) => {
        let temp = [...formData.dropdownOptions];
        temp.splice(key, 1);
        setFormData({ ...formData, dropdownOptions: temp });
    }

    const onBackClick = () => {
        clearUser();
        clearForm();
        history.goBack();
    }

    /* On Submit */
    const onSubmit = (e) => {
        e.preventDefault();

        createForm(formData);
        clearUser();
        clearForm();
        history.goBack();
    }
    return formData && !showPreview ? (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form className="mt-4 mb-4" onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formDescription" className="p-3 rounded bg-white">
                            <Form.Label>Title and Description
                            <OverlayTrigger trigger="click" placement="right" overlay={popover("Title & Description", "Enter your form title and a description of what the form is about.")}>
                                <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                            </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" value={formData.title || ''} name="title" onChange={(e) => onChange(e)} />
                            <Form.Control type="text" value={formData.description || ''} name="description" onChange={(e) => onChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="textForm" className="p-3 rounded bg-white">
                            <Form.Label>Short Text Field
                                <OverlayTrigger trigger="click" placement="right" overlay={popover("Short Text Field", "This input is for short, open ended questions in forms.")}>
                                    <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={formData.shortTextTitle || ''} name="shortTextTitle" onChange={(e) => onChange(e)} />
                            <Form.Control type="text" readOnly={true} placeholder="Short answer text" />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Long Text Field
                                <OverlayTrigger trigger="click" placement="right" overlay={popover("Long Text Field", "Like the short text field, but longer!")}>
                                    <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={formData.longTextTitle || ''} name="longTextTitle" onChange={(e) => onChange(e)} />
                            <Form.Control as='textarea' readOnly={true} />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Multiple Choice
                                <OverlayTrigger trigger="click" placement="right" overlay={popover("Multiple Choice Options", "A multiple choice input where you can add as many options as you like by pressing the '+' button and entering the value. You may also delete the options with the '-' Button")}>
                                    <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={formData.multipleChoiceTitle || ''} name="multipleChoiceTitle" onChange={(e) => onChange(e)} />
                            {formData.multipleChoiceOptions.length > 0 && (
                                formData.multipleChoiceOptions.map((value, key) => (
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
                            <Form.Label>Checkbox
                                <OverlayTrigger trigger="click" placement="right" overlay={popover("Checkbox Options", "This input functions the same as the multiple choice inputs except the fact that users may select more than one option.")}>
                                    <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={formData.checkboxTitle || ''} name="checkboxTitle" onChange={(e) => onChange(e)} />
                            {formData.checkboxOptions.length > 0 && (
                                formData.checkboxOptions.map((value, key) => (
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
                            <Form.Label>Dropdown
                                <OverlayTrigger trigger="click" placement="right" overlay={popover("Dropdown Options", "Same as the two inputs above, except that this is in the form of a dropdown.")}>
                                    <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control className="mb-2" type="text" placeholder="Question" value={formData.dropdownTitle || ''} name="dropdownTitle" onChange={(e) => onChange(e)} />
                            <Form.Control className="mb-2" as="select" defaultValue="Select" disabled>
                                {formData.dropdownOptions.length > 0 && (
                                    formData.dropdownOptions.map((value, key) => (
                                        <option key={key}>{value}</option>
                                    ))
                                )}
                            </Form.Control>
                            {formData.dropdownOptions.length > 0 && (
                                formData.dropdownOptions.map((value, key) => (
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
                            <Button className="mr-2" variant="secondary" type="button" onClick={() => onBackClick()}>Back</Button>
                            <Button className="mr-2" type="submit">Save Form</Button>
                            <Button type="button" onClick={ () => setShowPreview(true)}>Preview Form</Button>
                            <OverlayTrigger trigger="click" placement="top" overlay={popover("Preview Form", "Check out what the form will look like when published!")}>
                                <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                            </OverlayTrigger>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) : (
        <PreviewForm formData={{ formData, setShowPreview }}/>
    );
}

NewForm.propTypes = {
    createForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    clearUser: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    form: state.form
})

export default connect(mapStateToProps, { createForm, clearUser, clearForm })(NewForm);