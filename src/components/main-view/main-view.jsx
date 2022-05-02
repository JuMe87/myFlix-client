import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import axios from "axios"
import { Col, Row, Container, Button } from "react-bootstrap"

import { NavbarView } from "../navbar-view/navbar-view"
import { RegistrationView } from "../registration-view/registration-view"
import { LoginView } from "../login-view/login-view"
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
import { DirectorView } from "../director-view/director-view"
import { GenreView } from "../genre-view/genre-view"
import { ProfileView } from "../profile-view/profile-view"

import "./main-view.scss"

export class MainView extends React.Component {
    constructor() {
        super()

        this.state = {
            movies: [],
            user: null,
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token")
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user"),
            })
            this.getMovies(accessToken)
        }
    }

    onLoggedIn(authData) {
        console.log(authData)
        this.setState({
            user: authData.user.Username,
        })

        localStorage.setItem("token", authData.token)
        localStorage.setItem("user", authData.user.Username)
        this.getMovies(authData.token)
    }

    getMovies(token) {
        axios
            .get("https://julesmyflixdb.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // componentDidMount() {
    //     axios
    //         .get("https://julesmyflixdb.herokuapp.com/movies")
    //         .then((response) => {
    //             this.setState({
    //                 movies: response.data,
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    onLoggedOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({
            user: null,
        })
    }

    render() {
        const { movies, user } = this.state

        // if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

        return (
            <Router>
                <NavbarView user={user} />
                <Button
                    id="logout-button"
                    onClick={() => {
                        this.onLoggedOut()
                    }}
                >
                    Logout
                </Button>
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView
                                                onLoggedIn={(user) =>
                                                    this.onLoggedIn(user)
                                                }
                                            />
                                        </Col>
                                    )
                                if (movies.length === 0)
                                    return <div className="main-view" />
                                return <MoviesList movies={movies} />
                            }}
                        />

                        <Route
                            path="/register"
                            render={() => {
                                if (user) return <Redirect to="/" />
                                return (
                                    <Col>
                                        <RegistrationView />
                                    </Col>
                                )
                            }}
                        />

                        <Route
                            path="/movies/:movieId"
                            render={({ match, history }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView
                                                onLoggedIn={(user) =>
                                                    this.onLoggedIn(user)
                                                }
                                            />
                                        </Col>
                                    )
                                if (movies.length === 0)
                                    return <div className="main-view" />
                                return (
                                    <Col md={8}>
                                        <MovieView
                                            movie={movies.find(
                                                (m) =>
                                                    m._id ===
                                                    match.params.movieId
                                            )}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }}
                        />

                        <Route
                            exact
                            path="/director/:name"
                            render={({ match, history }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView
                                                onLoggedIn={(user) =>
                                                    this.onLoggedIn(user)
                                                }
                                            />
                                        </Col>
                                    )
                                if (movies.length === 0)
                                    return <div className="main-view" />
                                return (
                                    <Col md={8}>
                                        <DirectorView
                                            director={
                                                movies.find(
                                                    (m) =>
                                                        m.Director.Name ===
                                                        match.params.name
                                                ).Director
                                            }
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }}
                        />

                        <Route
                            exact
                            path="/genre/:name"
                            render={({ match, history }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView
                                                onLoggedIn={(user) =>
                                                    this.onLoggedIn(user)
                                                }
                                            />
                                        </Col>
                                    )
                                if (movies.length === 0)
                                    return <div className="main-view" />
                                return (
                                    <Col md={8}>
                                        <GenreView
                                            genre={
                                                movies.find(
                                                    (m) =>
                                                        m.Genre.Name ===
                                                        match.params.name
                                                ).Genre
                                            }
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }}
                        />

                        <Route
                            path="/users/:username"
                            render={({ history, match }) => {
                                if (!user)
                                    return (
                                        <LoginView
                                            onLoggedIn={(user) =>
                                                this.onLoggedIn(user)
                                            }
                                        />
                                    )
                                if (movies.length === 0)
                                    return <div className="main-view" />
                                return (
                                    <Col>
                                        <ProfileView
                                            history={history}
                                            movies={movies}
                                            user={user}
                                        />
                                    </Col>
                                )
                            }}
                        />

                        <Route
                            path={"/user-update/${user}"}
                            render={({ match, history }) => {
                                if (!user) return <Redirect to="/" />
                                return (
                                    <Col>
                                        <UserUpdate
                                            user={user}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }}
                        />
                    </Row>
                </Container>
            </Router>
        )
    }
}

export default MainView
