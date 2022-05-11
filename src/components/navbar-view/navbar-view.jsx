import React from "react"
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"

import "./navbar-view.scss"

export function NavbarView({ user }) {
    const onLoggedOut = () => {
        localStorage.clear()
        window.open("/", "_self")
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token")
        } else {
            return false
        }
    }

    return (
        <Navbar
            className="main-nav"
            sticky="top"
            bg="dark"
            expand="lg"
            variant="dark"
        >
            <Container>
                <Navbar.Brand className="navbar-logo" as={NavLink} to="/">
                    My Flix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link as={NavLink} to={`/users/${user}`}>
                                {user}
                            </Nav.Link>
                        )}
                        {/* {user && (
                            <Nav.Link as={NavLink} to={`/user-update/${user}`}>
                                Update Profile
                            </Nav.Link>
                        )} */}
                        {isAuth() && (
                            <Nav.Link
                                onClick={() => {
                                    this.onLoggedOut()
                                }}
                            >
                                Logout
                            </Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link as={NavLink} to="/register">
                                Register
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
