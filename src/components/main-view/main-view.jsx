import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    NavLink as RRNavLink,
} from "react-router-dom"
import axios from "axios"
import { Col, Row, Container } from "react-bootstrap"

import { connect } from "react-redux"

import MoviesList from "../movies-list/movies-list"
import { NavbarView } from "../navbar-view/navbar-view"
import { RegistrationView } from "../registration-view/registration-view"
import { LoginView } from "../login-view/login-view"
// import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
import { DirectorView } from "../director-view/director-view"
import { GenreView } from "../genre-view/genre-view"
import ProfileView from "../profile-view/profile-view"

import {
    setMovies,
    setUser,
    setFavorites,
    setUserData,
} from "../../actions/actions"

import { connect } from "react-redux"

import "./main-view.scss"

class MainView extends React.Component {
    // export = exposes the MainView component and makes it available for use by other components
    // One could omit export here and put it in a separate line such as export MainView
    // Class = creates MainView component

    // constructor are used to initialize component - nothing shows on screen yet
    constructor() {
        super()

        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token")
        if (accessToken !== null) {
            const user = localStorage.getItem("user")
            this.props.setUser(user)
            this.setState({
                user,
            })
            this.getMovies(accessToken)
            this.getUser(accessToken)
        }
    }

    getUser(token) {
        const Username = localStorage.getItem("user")

        axios
            .get(`https://julesmyflixdb.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.props.setUserData({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
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
                this.props.setMovies(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    onLoggedOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({
            user: null,
        })
    }

    render() {
        let { movies } = this.props
        let { user } = this.state

        return (
            // <Container style={{ paddingTop: "4rem " }} fluid>
            <Container>
                <Router>
                    <NavbarView user={user} />
                    {/* <Navbar
                        collapseOnSelect
                        expand="lg"
                        bg="dark"
                        variant="dark"
                        fixed="top"
                    >
                        <Navbar.Brand id="header" href="/">
                            My Flix
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                {!user && (
                                    <Nav.Link as={RRNavLink} to="/register">
                                        Register
                                    </Nav.Link>
                                )}

                                {!user && (
                                    <Nav.Link
                                        as={RRNavLink}
                                        to={`/users/${user}`}
                                    >
                                        Profile
                                    </Nav.Link>
                                )}

                                {!user && (
                                    <Nav.Link
                                        as={RRNavLink}
                                        to={`/user-update/${user}`}
                                    >
                                        Update Profile
                                    </Nav.Link>
                                )}

                                {!user && (
                                    <Nav.Link as={RRNavLink} to="/login">
                                        Login
                                    </Nav.Link>
                                )}

                                {user && (
                                    <Nav.Link
                                        onClick={() => this.onLoggedOut()}
                                    >
                                        Logout
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> */}

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
                                    return <MoviesList />
                                }}
                            />

                            <Route
                                exact
                                path="/login"
                                render={() => {
                                    if (user) return <Redirect to="/" />
                                    return (
                                        <Col>
                                            <LoginView
                                                onLoggedIn={(user) =>
                                                    this.onLoggedIn(user)
                                                }
                                            />
                                        </Col>
                                    )
                                }}
                            />

                            <Route
                                exact
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
                                exact
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
                                                onBackClick={() =>
                                                    history.goBack()
                                                }
                                            />
                                        </Col>
                                    )
                                }}
                            />

                            <Route
                                exact
                                path="/directors/:name"
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
                                                onBackClick={() =>
                                                    history.goBack()
                                                }
                                            />
                                        </Col>
                                    )
                                }}
                            />

                            <Route
                                exact
                                path="/genres/:name"
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
                                                onBackClick={() =>
                                                    history.goBack()
                                                }
                                            />
                                        </Col>
                                    )
                                }}
                            />

                            {/* <Route
                                exact
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
                            /> */}

                            <Route
                                path={`/users/${user}`}
                                render={({ history }) => {
                                    if (!user) return <Redirect to="/" />
                                    return (
                                        <Col>
                                            <ProfileView
                                                onBackClick={() =>
                                                    history.goBack()
                                                }
                                            />
                                        </Col>
                                    )
                                }}
                            />
                        </Row>
                    </Container>
                </Router>
            </Container>
        )
    }
}

// Function allows component to subscribe to store updates, anytime the store is updated, this function is called
let mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user,
        favorites: state.favorites,
        genres: state.genres,
        directors: state.directors,
    }
}

// mapStateToProps should take the store state as an argument andn return the new props for the component
export default connect(mapStateToProps, {
    setMovies,
    setUser,
    setFavorites,
    setUserData,
})(MainView)
