import React, { forwardRef, useImperativeHandle, useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

function ModalEdit(props, ref) {
    const host = import.meta.env.HOST
    const port = import.meta.env.PORT || 8080

    const cookies = new Cookies()
    const authorization = cookies.get("Authorization")

    const [contact, setContact] = useState({})
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        setContact({})
    }

    function getData(id) {
        axios
            .get(`${host}:${port}laravel-api/public/api/contacts/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContact(res.data.data))
            .catch((err) => console.log(err))
    }

    useImperativeHandle(ref, () => ({
        handleShow(id) {
            setShow(true)
            getData(id)
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
                        onClick={() => props.updateData(contact)}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default forwardRef(ModalEdit)
