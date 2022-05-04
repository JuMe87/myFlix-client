import React from "react"
import PropTypes from "prop-types"
import { CardGroup, Container, Button, Card } from "react-bootstrap"

import { Link } from "react-router-dom"

import "./movie-card.scss"
import axios from "axios"

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props

        return (
            <Container>
                <CardGroup>
                    <Card>
                        <Card.Img
                            variant="top"
                            img
                            crossOrigin="true"
                            src={movie.ImagePath}
                        />
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Link to={`/movies/${movie._id}`}>
                                <Button variant="link">Open</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default MovieCard
