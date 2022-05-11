import React from "react"
import PropTypes from "prop-types"
import { Button, Card } from "react-bootstrap"

import { Link } from "react-router-dom"

import "./movie-card.scss"

export class MovieCard extends React.Component {
    render() {
        const { movie, onBackClick } = this.props

        return (
            <Card>
                <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    crossOrigin="true"
                />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    {/* <Card.Text>{movie.Description}</Card.Text> */}
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Description</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">{movie.Genre.Name}</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                </Card.Body>
            </Card>
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
    //     onBackClick: PropTypes.func.isRequired,
}

export default MovieCard
