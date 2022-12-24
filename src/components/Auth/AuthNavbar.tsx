import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

interface AuthNavbarProps {
    title?: string;
}

function AuthNavbar(props: AuthNavbarProps) {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{props.title ? props.title : "Lasma Leaderboard"}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/app/showcase">Showcase</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AuthNavbar;
