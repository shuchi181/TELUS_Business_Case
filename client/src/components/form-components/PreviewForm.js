import React from 'react';

import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const PreviewForm = ({formData: { formData, setShowPreview }}) => {
    
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

    return formData && setShowPreview && (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form className="mt-4 mb-4">
                        <Form.Group controlId="formDescription" className="p-3 rounded bg-white">
                            <Form.Text className="mb-2"><h1 className="display-4">{title || ''}</h1></Form.Text>
                            <Form.Text><h4>{description || ''}</h4></Form.Text>
                        </Form.Group>
                        <Form.Group controlId="textForm" className="p-3 rounded bg-white">
                            <Form.Label>Short Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{shortTextTitle || ''}</Form.Text>
                            <Form.Control type="text" placeholder="Short answer text" />
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Long Text Field</Form.Label>
                            <Form.Text className="mb-2 lead">{longTextTitle || ''}</Form.Text>
                            <Form.Control as='textarea'/>
                        </Form.Group>
                        <Form.Group className="p-3 rounded bg-white">
                            <Form.Label>Multiple Choice</Form.Label>
                            <Form.Text className="mb-2 lead">{multipleChoiceTitle || ''}</Form.Text>
                            {multipleChoiceOptions && multipleChoiceOptions.length > 0 && (
                                multipleChoiceOptions.map((value, key) => (
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
                            <Form.Text className="mb-2 lead">{checkboxTitle}</Form.Text>
                            {checkboxOptions && checkboxOptions.length > 0 && (
                                checkboxOptions.map((value, key) => (
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
                            <Form.Text className="mb-2 lead">{dropdownTitle}</Form.Text>
                            <Form.Control className="mb-2" as="select">
                                <option selected disabled>Select One</option>
                                {dropdownOptions && dropdownOptions.length > 0 && (
                                    dropdownOptions.map((value, key) => (
                                        <option>{value}</option>
                                    ))
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button type="button" variant="secondary" onClick={() => setShowPreview(false)}>Back</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PreviewForm;