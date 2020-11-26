import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { updateForm } from '../../actions/form';

import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import form from '../../reducers/form';

const NewForm = ({ updateForm, match }) => {
    const formId = match.params.formId;
    const [formData, setFormData] = useState({
        title: 'Untitled Form',
        description: 'Form Description',
        shortTextTitle: '',
        shortTextValue: '',
        longTextTitle: '',
        longTextValue: '',
        multipleChoiceTitle: '',
        multipleChoiceOptions: [],
        checkboxTitle: '',
        checkboxOptions: [],
        dropdownTitle: '',
        dropdownOptions: []
    });

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

    /* Dropdown functions */

    return formData && (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form>
                        <Form.Group controlId="formDescription">
                            <Form.Control type="text" value={formData.title || ''} name="title" onChange={(e) => onChange(e)} />
                            <Form.Control type="text" value={formData.description || ''} name="description" onChange={(e) => onChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="textForm">
                            <Form.Label>Short Text Field</Form.Label>
                            <Form.Control type="text" placeholder="Question" value={formData.shortTextTitle || ''} />
                            <Form.Control type="text" readOnly={true} placeholder="Short answer text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Long Text Field</Form.Label>
                            <Form.Control type="text" placeholder="Question" value={formData.longTextTitle || ''} />
                            <Form.Control as='textarea' readOnly={true} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Multiple Choice</Form.Label>
                            {formData.multipleChoiceOptions.length > 0 && (
                                formData.multipleChoiceOptions.map((value, key) => (
                                    <Form.Row key={key}>
                                        <Col xs={4}>
                                            <Form.Check label={value} type="radio" disabled />
                                        </Col>
                                        <Col xs={7}>
                                            <Form.Control type="text" value={value} onChange={(e) => onRadioButtonChange(e, key)} />
                                        </Col>
                                        <Col>
                                            <Button onClick={() => removeRadioOption(key)}>-</Button>
                                        </Col>
                                    </Form.Row>
                                ))
                            )}
                            <Form.Row>
                                <Button onClick={() => addRadioOption()}>+</Button>
                            </Form.Row>
                            
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default connect(null, { updateForm })(NewForm);