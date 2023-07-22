import React, { useEffect, useState, useRef } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import { PiTrashFill, PiPencil } from "react-icons/pi"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import "./contactList.css"
import ModalEdit from "./modalEdit"
import ModalCreate from "./modalCreate"
import { Form, Button } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NavbarContact from "./navbarContact"
import ModalDelete from "./modalDelete"

function ContactList() {
    const host = import.meta.env.VITE_HOST
    const port = import.meta.env.VITE_PORT || 80

    const cookies = new Cookies()
    const navigate = useNavigate()

    const authorization = cookies.get("Authorization")
    const refCreate = useRef()
    const refUpdate = useRef()
    const refDelete = useRef()

    const [contacts, setContacts] = useState([])
    const [filterBy, setFilterBy] = useState("nama")
    const [searchValue, setSearchValue] = useState("")
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const authorization = cookies.get("Authorization")
        axios
            .get(`${host}:${port}/laravel-api/public/api/me`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => {
                setUserData(res.data)
                getData()
            })
            .catch((err) => navigate("/signin"))
    }, [])

    function getData() {
        axios
            .get(`${host}:${port}/laravel-api/public/api/contacts`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContacts(res.data.data))
            .catch((err) => console.log(err))
    }

    function deleteData(id) {
        axios
            .delete(`${host}:${port}/laravel-api/public/api/contacts/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => {
                refDelete.current.handleClose()
                toast.success("Berhasil menghapus data", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                getData()
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
    }

    function updateData(data) {
        const { id, nama, email, nomor } = data
        axios
            .put(
                `${host}:${port}/laravel-api/public/api/contacts/${id}`,
                { nama, email, nomor },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authorization}`,
                    },
                }
            )
            .then((res) => {
                refUpdate.current.handleClose()
                toast.success("Berhasil mengupdate data", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                getData()
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
    }

    function createData(data) {
        const { nama, email, nomor } = data

        axios
            .post(
                `${host}:${port}/laravel-api/public/api/contacs`,
                { nama, email, nomor },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authorization}`,
                    },
                }
            )
            .then((res) => {
                refCreate.current.handleClose()
                toast.success("Berhasil menambahkan data", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                getData()
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
    }

    function searchContact(value) {
        setSearchValue(value)
        axios
            .get(`${host}:${port}/laravel-api/public/api/contacts`, {
                params: {
                    [filterBy]: value,
                },
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContacts(res.data.data))
            .catch((err) => console.log(err))
    }

    function logout() {
        axios
            .get(`${host}:${port}/laravel-api/public/api/logout`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => navigate("/signin"))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <ToastContainer />
            <NavbarContact logout={logout} email={userData.email} />
            <ModalCreate ref={refCreate} createData={createData} />
            <ModalEdit ref={refUpdate} updateData={updateData} />
            <ModalDelete ref={refDelete} deleteData={deleteData} />
            <Container fluid className="text-start mt-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex w-50">
                        <Form.Select
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                                setSearchValue("")
                                getData()
                            }}
                        >
                            <option value="nama">Nama</option>
                            <option value="email">Email</option>
                        </Form.Select>
                        <Form.Control
                            placeholder="search"
                            value={searchValue}
                            onChange={(e) => searchContact(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => refCreate.current.handleShow()}>
                        New Contact
                    </Button>
                </div>
                <Table hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.nama}</td>
                                <td>{contact.email}</td>
                                <td>{contact.nomor}</td>
                                <td>
                                    <div className="d-flex gap-2 fs-5">
                                        <PiPencil
                                            className="pointer"
                                            onClick={() =>
                                                refUpdate.current.handleShow(
                                                    contact.id
                                                )
                                            }
                                        />
                                        <PiTrashFill
                                            className="text-danger pointer"
                                            onClick={() =>
                                                refDelete.current.handleShow(
                                                    contact.nama,
                                                    contact.id
                                                )
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ContactList
