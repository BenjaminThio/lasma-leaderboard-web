import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {AuthService} from "../../services/Auth";

interface HomeNavbarProps {
    title?: string;
}

function HomeNavbar(props: HomeNavbarProps) {
    const {authed, authLoading} = AuthService();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{props.title ? props.title : "Lasma Leaderboard"}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/app/showcase">Showcase</Nav.Link>
                        <Nav.Link href="/app/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        {
                            authLoading ?
                                <span>Loading...</span>
                                :
                                authed ?
                                    <Nav.Link href={"/app"}>Proceed to app</Nav.Link>
                                    :
                                    <Nav.Link href={"/auth"}>Login</Nav.Link>
                        }
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
}

export default HomeNavbar;
