import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInForm from "./components/signInForm"
import SignUpForm from "./components/signUpForm"
import ContactList from "./components/contactList"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="contacts" element={<ContactList />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
