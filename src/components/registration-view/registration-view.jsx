import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from "react-bootstrap"

import "./registration-view.scss"

export function RegistrationView(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")

    //Declare hook for each input
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [birthdayErr, setbirthdayErr] = useState("")

    const validate = () => {
        let isReq = true

        if (!username) {
            setUsernameErr("Create Username")
            isReq = false
        } else if (username.length > 8) {
            setUsernameErr("Username must be min 8 characters long")
            isReq = false
        } else {
            setusernameErr("")
            isReq = true
        }

        if (!password) {
            setPasswordErr("Create Password")
            isReq = false
        } else if (password.length > 6) {
            setPasswordErr("Password must be at least 7 characters long")
            isReq = false
        } else {
            setpasswordErr("")
            isReq = true
        }

        if (!email) {
            setEmailErr("Add Email")
            isReq = false
        } else if (email.indexOf("@") === -1) {
            setEmail("Invalid Email")
            isReq = false
        } else {
            setemailErr("")
            isReq = true
        }

        if (!birthday) {
            setbirthdayErr("Enter Birthday")
            isReq = false
        } else {
            setbirthdayErr("")
            isReq = true
        }
        return isReq
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isReq = validate()
        if (isReq) {
            axios
                .post("https://julesmyflixdb.herokuapp.com/users", {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                })
                .then((response) => {
                    const data = response.data
                    console.log(data)
                    alert("Success! Please Login.")
                    window.open("/", "_self")
                    //The second argument '_self' is necessary so that the page will
                    //open in the current tab
                })
                .catch((response) => {
                    console.error(response)
                    alert("something wasn't entered right")
                })
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card
                        style={{
                            marginTop: 150,
                            marginBottom: 50,
                            width: 300,
                        }}
                    >
                        <Card.Body>
                            <Card.Title>Please register</Card.Title>
                            <Form>
                                <Form.Group
                                    controlId="formUsername"
                                    className="reg-form-inputs"
                                >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                        placeholder="Enter a username (min 8 characters)"
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formPassword"
                                    className="reg-form-inputs"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        minlenght="6"
                                        placeholder="Your password must be 6 or more characters."
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="Email"
                                    className="reg-form-inputs"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        placeholder="Enter your email address"
                                    />
                                </Form.Group>

                                <Form.Group controlId="updateBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        className="birthday-input"
                                        autoComplete="bday"
                                        onChange={(e) =>
                                            setBirthday(e.target.value)
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
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
}

export default RegistrationView
