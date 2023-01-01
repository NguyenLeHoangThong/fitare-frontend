import { useState, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classes from "./styles.module.scss";

const PopupDeleteExercisePlan = memo((props) => {
    const { isShowModal, handleClose, handleDelete, deleteId } = props;

    return (
        <>
            {
                isShowModal && (
                    <Modal centered show={isShowModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className={classes.title}>Please confirm to delete this exercise plan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Warning: all related information of this exercise plan would be also deleted !</Modal.Body>
                        <Modal.Footer className="justify-content-between">
                            <Button className={classes.buttonClose} onClick={handleClose}>
                                Close
                            </Button>
                            <Button className={classes.buttonDelete} onClick={() => handleDelete(deleteId)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    );
})

export default PopupDeleteExercisePlan;