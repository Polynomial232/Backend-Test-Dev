import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

function NavbarContact(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary border-bottom-1">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link
                        onClick={() => props.logout()}
                        className="text-danger"
                    >
                        Logout
                    </Nav.Link>
                </Nav>
                <Navbar.Text>
                    Signed in as: <b>{props.email}</b>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default NavbarContact
