import React, { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

function ModalCreate(props, ref) {
    const [contact, setContact] = useState({})

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setContact({})
    }

    useImperativeHandle(ref, () => ({
        handleShow() {
            setShow(true)
        },
        handleClose() {
            handleClose()
        },
    }))

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingNama"
                        label="Nama"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="nama"
                            value={contact.nama || ""}
                            onChange={(e) =>
                                setContact({ ...contact, nama: e.target.value })
                            }
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="email"
                            value={contact.email || ""}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    email: e.target.value,
                                })
                            }
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingNomor"
                        label="Nomor"
                        className="mb-3"
                    >
                        <Form.Control
                            type="number"
                            placeholder="nomor"
                            value={contact.nomor || ""}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    nomor: e.target.value,
                                })
                            }
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => props.createData(contact)}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default forwardRef(ModalCreate)
