import React from "react"
import PropTypes from "prop-types"

import "./genre-view.scss"

import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="genre-view">
                            <Card.Body>
                                <Card.Title>{genre.Name}</Card.Title>
                                <Card.Text>Bio: {genre.Description}</Card.Text>
                                <Button
                                    id="genre-back-button"
                                    onClick={() => {
                                        onBackClick()
                                    }}
                                >
                                    Back
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={30}>
                        <CardGroup>
                            {movies.map((movie) => (
                                <Card
                                    className="favorite-movie card-content"
                                    key={movie._id}
                                >
                                    <Card.Img
                                        className="fav-poster"
                                        variant="top"
                                        src={movie.ImagePath}
                                    />
                                    <Card.Body
                                        style={{ backgroundColor: "black" }}
                                    >
                                        <Card.Title className="movie_title">
                                            {movie.Title}
                                        </Card.Title>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button
                                                id="card-button"
                                                variant="link"
                                            >
                                                Show more
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            ))}
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}

export default GenreView
