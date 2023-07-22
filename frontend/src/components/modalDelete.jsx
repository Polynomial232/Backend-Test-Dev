import React, { forwardRef, useImperativeHandle, useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

function ModalDelete(props, ref) {
    const cookies = new Cookies()

    const [contact, setContact] = useState({})
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        setContact({})
    }

    useImperativeHandle(ref, () => ({
        handleShow(nama, id) {
            setShow(true)
            setContact({ id: id, nama: nama })
        },
        handleClose() {
            handleClose()
        },
    }))

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Yakin ingin menghapus {contact.nama}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => props.deleteData(contact.id)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default forwardRef(ModalDelete)
