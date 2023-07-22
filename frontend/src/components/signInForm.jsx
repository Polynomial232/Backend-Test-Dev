import React, { useEffect, useState, useContext } from "react"
import "./sign.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { Form, FloatingLabel, InputGroup, Button, Alert } from "react-bootstrap"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify"

function SignInForm() {
    const host = import.meta.env.VITE_HOST
    const port = import.meta.env.VITE_PORT || 80

    const cookies = new Cookies()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

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
                navigate("/contacts")
            })
            .catch((err) => console.log(err))
    }, [])

    function submitHandler(e) {
        e.preventDefault()
        axios
            .post(
                `${host}:${port}/laravel-api/public/api/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                cookies.set("Authorization", res.data, { path: "/" })
                toast.success("Sign In Success", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                navigate("/contacts")
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="container-form">
                <div className="shadow bg-body rounded">
                    <div className="banner-login rounded-top-2"></div>
                    <div className="login-wrap px-md-5 py-md-4">
                        <h3 className="mb-4 fw-light">Sign In</h3>
                        <form className="signin-form">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FloatingLabel>
                            <InputGroup className="mb-3">
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Password"
                                >
                                    <Form.Control
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                    />
                                </FloatingLabel>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <AiOutlineEye />
                                    ) : (
                                        <AiOutlineEyeInvisible />
                                    )}
                                </Button>
                            </InputGroup>
                            <InputGroup className="d-grid gap-2">
                                <Button
                                    variant="success"
                                    onClick={submitHandler}
                                >
                                    Sign In
                                </Button>
                            </InputGroup>
                        </form>
                        <p className="mt-3">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInForm
