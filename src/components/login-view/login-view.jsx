import React, { useState } from "react"
import PropTypes from "prop-types"
import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from "react-bootstrap"

import axios from "axios"

import { Link } from "react-router-dom"

import "./login-view.scss"

export function LoginView(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    // validate user inputs
    const validate = () => {
        let isReq = true
        if (!username) {
            setUsernameErr("Username Required")
            isReq = false
        } else if (username.length < 2) {
            setUsernameErr("Username must be at least 2 characters long")
            isReq = false
        }
        if (!password) {
            setPasswordErr("Password Required")
            isReq = false
        } else if (password.length < 6) {
            setPasswordErr("Password must be at least 6 characters long")
            isReq = false
        }
        return isReq
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isReq = validate()
        if (isReq) {
            /* Send a request to the server for authentication */
            axios
                .post("https://julesmyflixdb.herokuapp.com/login", {
                    Username: username,
                    Password: password,
                })
                .then((response) => {
                    const data = response.data
                    props.onLoggedIn(data) //props.onLoggedIn(username) has been changed
                })
                .catch((e) => {
                    console.log("no such user", e)
                })
        }
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card
                        style={{
                            marginTop: 100,
                            marginBottom: 50,
                            width: "30",
                        }}
                    >
                        <Card.Body>
                            <Card.Title
                                style={{ textAlign: "center", fontSize: "2m" }}
                            >
                                Please login
                            </Card.Title>
                            <Form className="login-border">
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Enter your username"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
}

export default LoginView
