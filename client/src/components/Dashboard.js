import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AiOutlineQuestionCircle } from 'react-icons/ai';

import { getForms, getPublishedForms, publishForm, getNotifications, resetNotifications } from '../actions/user';

// Bootstrap Components
import { Container, Row, Card, Button, Alert, Popover, OverlayTrigger } from 'react-bootstrap';

const Dashboard = ({
    user: { forms, publishedForms, notifications, loading },
    getForms,
    getPublishedForms,
    publishForm,
    getNotifications,
    resetNotifications,
}) => {

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if(!forms) {
            getForms();
            getPublishedForms();
            getNotifications();
        }
        if(notifications && !notifications.hasChecked && notifications.newNotification > 0) {
            setShowNotification(true);
        }
    }, [forms, publishedForms, getForms, getPublishedForms, loading, notifications, getNotifications]);

    const onClickPublish = (id) => {
        publishForm(id);
    }

    const removeNotification = () => {
        setShowNotification(false);
        resetNotifications();
    }
    
    const popover = (title, content) => {
        return (
            <Popover>
                <Popover.Title as="h3">{title}</Popover.Title>
                <Popover.Content>{content}</Popover.Content>
            </Popover>
        );
    }

    return (
        <Container fluid className="w-100 mx-auto p-4">
            <Row>
                <Row className="ml-4 mb-4 d-flex flex-row">
                    {showNotification &&
                        <Fragment>
                            <Button variant="primary" onClick={() => removeNotification()}>You have {notifications.newNotification} new Notifications!</Button>
                        </Fragment>
                    }
                </Row>
                <Row className="mx-4 w-100 d-flex flex-row">
                    <Alert variant="info">
                        You may need to refresh the page to see changes such as the new forms and responses. Apologies for the inconvenience!
                    </Alert>
                </Row>
                <Row className="m-4 d-flex flex-row w-100">
                    <h1 className="lead font-weight-bold w-100">Your Forms
                        <OverlayTrigger trigger="click" placement="right" overlay={popover("Your Forms", "This is where you can add a new form or edit an existing one. Once a form has been finalized, click the publish button to be able to fill out a response!")}>
                            <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                        </OverlayTrigger>
                    </h1>
                    <Card className="m-2 p-2 h-auto">
                        <Card.Body className="text-center">
                            <Card.Title>Make a new Form</Card.Title>
                            <Button type="button" className="mt-3"><Link to="/new-form" className="text-white">New Form</Link></Button>
                        </Card.Body>
                    </Card>
                    {forms && forms.length > 0 ? (
                        forms.map((form, key) => (
                            <Card key={key} className="h-auto m-2 p-2">
                                <Card.Body>
                                    <Card.Title>{form.form.title}</Card.Title>
                                    <Card.Text>{form.form.description}</Card.Text>
                                    <Button type="button" size="sm" className="m-1"><Link className="text-white" to={`/edit-form/${form._id}`} >Edit Form</Link></Button>
                                    <Button type="button" size="sm" className="m-1" onClick={() => onClickPublish(form._id)}>Publish</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No forms to show...</p>
                    )}
                </Row>
                <Row className="m-4 mt-5 d-flex flex-row">
                    <h1 className="lead font-weight-bold w-100">Your Published Forms
                        <OverlayTrigger trigger="click" placement="right" overlay={popover("Published Forms", "Once published, forms can't be edited. You can fill out the form and see the responses in a table format!")}>
                            <AiOutlineQuestionCircle className="ml-2" type="button" size={24}/>
                        </OverlayTrigger>
                    </h1>
                    {publishedForms && publishedForms.length > 0 ? (
                        publishedForms.map((form, key) => (
                            <Card key={key} className="h-auto m-2 p-2">
                                <Card.Body>
                                    <Card.Title>{form.form.title}</Card.Title>
                                    <Card.Text>{form.form.description}</Card.Text>
                                    <Card.Text>Responses: {form.formResponses.length || 0}</Card.Text>
                                    <Button type="button" size="sm" className="m-1"><Link className="text-white" to={`/published-form/${form._id}`}>Fill Out Form</Link></Button>
                                    <Button type="button" size="sm" className="m-1"><Link className="text-white" to={`/view-responses/${form._id}`}>View Responses</Link></Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <h4 className="lead">You have no published forms...</h4>
                    )}
                </Row>
            </Row>
        </Container>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    getForms: PropTypes.func.isRequired,
    getPublishedForms: PropTypes.func.isRequired,
    publishForm: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    resetNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, { getForms, getPublishedForms, publishForm, getNotifications, resetNotifications })(Dashboard);