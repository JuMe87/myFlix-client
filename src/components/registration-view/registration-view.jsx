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

import { Link } from "react-router-dom"

import "./registration-view.scss"

export function RegistrationView(props) {
    // const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")

    //Declare hook for each input
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [emailErr, setEmailErr] = useState("")

    // Validate function
    const validate = () => {
        let isReq = true
        if (!username) {
            setUsernameErr("Create Username")
            isReq = false
        } else if (username.length < 8) {
            setUsernameErr("Username must be 8 characters long")
            isReq = false
        }
        if (!password) {
            setPasswordErr("Create Password(Min 8 characters)")
            isReq = false
        } else if (password.length < 6) {
            setPasswordErr("Password must be 6 characters long")
            isReq = false
        }
        if (!email) {
            setEmailErr("Add Email")
            isReq = false
        } else if (email.indexOf("@") === -1) {
            setEmail("Invalid Email")
            isReq = false
        }

        return isReq
    }

    // Assign variable isReq to validate function
    const handleSubmit = (e) => {
        e.preventDefault()
        const isReq = validate()
        if (isReq) {
            axios
                .post("https://julesmyflixdb.herokuapp.com/users", {
                    // Name: name,
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                })
                .then((response) => {
                    const data = response.data
                    console.log(data)
                    alert("Registration successful, please login!")
                    window.open("/", "_self")
                    //The second argument '_self' is necessary so that the page will
                    //open in the current tab
                })
                .catch((response) => {
                    console.error(response)
                    alert("unable to register")
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
                                        placeholder="Enter a username"
                                    />
                                </Form.Group>

                                {/* <Form.Group
                                    controlId="formName"
                                    className="reg-form-inputs"
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        placeholder="Enter a Name"
                                    />
                                    {values.nameErr && <p>{values.nameErr}</p>}
                                </Form.Group> */}

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
                                        name="birthday"
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
                                <p></p>
                                <p>
                                    {" "}
                                    Already registered?{" "}
                                    <Link to={"/"}>Sign-in</Link> here
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        // Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
}

export default RegistrationView
