import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalAction = ({children, title, modal, toggle}) => {
    return (
        <Modal isOpen={modal} toggle={() => toggle()} centered>
            <ModalHeader toggle={() => toggle()}>{title}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
}

export default ModalAction