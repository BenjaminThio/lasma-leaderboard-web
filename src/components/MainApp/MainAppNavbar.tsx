import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

interface MainAppNavbarProps {
    title?: string;
}

function MainAppNavbar(props: MainAppNavbarProps) {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{props.title ? props.title : "Lasma Leaderboard"}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/app/profile">Profile</Nav.Link>
                        <Nav.Link href="/app/showcase">Showcase</Nav.Link>
                        <Nav.Link href="/app/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        <Nav.Link href={"/auth/logout"}>Logout</Nav.Link>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
}

export default MainAppNavbar;
