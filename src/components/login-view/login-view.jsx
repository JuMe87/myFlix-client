import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, Button, Card, Container, Col, Row } from "react-bootstrap"

import "./login-view.scss"

export function LoginView(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username, password)
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username)
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
                            ></Card.Title>
                            <Form className="login-border">
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Register
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
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
}

export default LoginView
