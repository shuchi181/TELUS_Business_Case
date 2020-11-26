import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getForms, getPublishedForms } from '../actions/user';

// Bootstrap Components
import { Container, Col, Row, Card } from 'react-bootstrap';

const Dashboard = ({
    user: { forms, publishedForms },
    getForms,
    getPublishedForms
}) => {

    useEffect(() => {
        if(!forms || !publishedForms) {
            getForms();
            getPublishedForms();
        }
    }, [forms, publishedForms, getForms, getPublishedForms]);

    return (
        <Container fluid>
            <Row>
                <h1>TELUS Business Case</h1>
            </Row>

            <Row>
                <Col xs={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Make a new Form</Card.Title>
                            <Link to="/new-form">New Form</Link>
                        </Card.Body>
                    </Card>
                </Col>
                {forms && forms.length > 0 ? (
                    forms.map(form => (
                        <Col xs={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{form.title}</Card.Title>
                                    <Link to={`/edit-form/${form._id}`} >Edit Form!</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <h2>You currently have no forms...</h2>
                )}
            </Row>
            <Row>
                {publishedForms && publishedForms.lenght > 0 ? (
                    publishedForms.map(form => (
                        <Col xs={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{form.title}</Card.Title>
                                    <Link to={`/published-form/${form._id}`}>Go To Form</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <h2>You have no published forms...</h2>
                )}
            </Row>
        </Container>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    getForms: PropTypes.func.isRequired,
    getPublishedForms: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getForms, getPublishedForms })(Dashboard);