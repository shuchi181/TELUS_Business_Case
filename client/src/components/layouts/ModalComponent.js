import React, { Fragment } from 'react';

import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ data: { show, setShow } }) => {
    return (
        <Fragment>
            <Modal show={show} onHide={setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={setShow(false)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default ModalComponent;