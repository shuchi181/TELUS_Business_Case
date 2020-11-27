import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getForms, getPublishedForms, publishForm, getNotifications, resetNotifications } from '../actions/user';
// Bootstrap Components
import { Container, Row, Card, Button, Alert } from 'react-bootstrap';

const Dashboard = ({
    user: { forms, publishedForms, notifications, loading },
    getForms,
    getPublishedForms,
    publishForm,
    getNotifications,
    resetNotifications,
}) => {

    const [formRerender, setFormRerender] = useState({
        forms: [],
        publishedForms: []
    });

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if(!forms) {
            getForms();
            getPublishedForms();
            getNotifications();
        }
        if(!loading) setFormRerender({ forms: forms, publishedForms, publishedForms });
        if(notifications && !notifications.hasChecked && notifications.newNotification > 0) {
            setShowNotification(true);
        }
        
    }, [forms, publishedForms, getForms, getPublishedForms, loading]);

    const onClickPublish = (id) => {
        publishForm(id);
        getForms();
        getPublishedForms();
    }

    const removeNotification = () => {
        setShowNotification(false);
        resetNotifications();
    }

    return formRerender && (
        <Container fluid>
            <Row className="m-4 d-flex flex-row">
                {showNotification &&
                    <Fragment>
                        <Alert>
                            You have {notifications.newNotification} new Notifications!
                        </Alert>
                        <Button type="button" onClick={() => removeNotification()}>Mark notification as seen</Button>
                    </Fragment>
                }
            </Row>
            <Row className="m-4 d-flex flex-row">
                <h1 className="lead font-weight-bold w-100">Your Forms</h1>
                <Card className="h-100 m-2 p-2">
                    <Card.Body>
                        <Card.Title>Make a new Form</Card.Title>
                        <Link to="/new-form">New Form</Link>
                    </Card.Body>
                </Card>
                {forms && forms.length > 0 ? (
                    forms.map((form, key) => (
                        <Card key={key} className="h-100 m-2 p-2">
                            <Card.Body>
                                <Card.Title>{form.form.title}</Card.Title>
                                <Card.Text>{form.form.description}</Card.Text>
                                <Link className="mr-4" to={`/edit-form/${form._id}`} >Edit Form!</Link>
                                <Card.Link href="#" onClick={() => onClickPublish(form._id)}>Publish</Card.Link>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No forms to show...</p>
                )}
            </Row>
            <Row className="m-4 d-flex flex-row ">
                <h1 className="lead font-weight-bold w-100">Your Published Forms</h1>
                {publishedForms && publishedForms.length > 0 ? (
                    publishedForms.map((form, key) => (
                        <Card key={key} className="h-100 m-2 p-2">
                            <Card.Body>
                                <Card.Title>{form.form.title}</Card.Title>
                                <Card.Text>{form.form.description}</Card.Text>
                                <Card.Text>Responses: {form.formResponses.length || 0}</Card.Text>
                                <Link to={`/published-form/${form._id}`}>Fill Out Form</Link>
                                <Link to={`/view-responses/${form._id}`}>View Responses</Link>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <h4 className="lead">You have no published forms...</h4>
                )}
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
    exportResponse: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getForms, getPublishedForms, publishForm, getNotifications, resetNotifications })(Dashboard);