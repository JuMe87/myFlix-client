import React from "react"
import PropTypes from "prop-types"
import { CardGroup, Container, Button, Card } from "react-bootstrap"
import axios from "axios"

import { Link } from "react-router-dom"

import "./movie-card.scss"

export class MovieCard extends React.Component {
    constructor() {
        super()

        this.state = {
            FavoriteMovies: [],
        }
    }

    onAddFavorite = (movie) => {
        const Username = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        axios
            .post(
                `https://julesmyflixdb.herokuapp.com/users/${Username}/movies/${movie._id}`,
                {
                    FavoriteMovies: this.state.FavoriteMovies,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    FavoriteMovies: response.data.FavoriteMovies,
                })
                console.log(response)
                alert("Movie added to Favorites")
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const { movie, onAddFavorite } = this.props

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
                <Card.Footer className="text-center">
                    <Button
                        variant="primary"
                        value={movie._id}
                        onClick={() => this.onAddFavorite(movie)}
                    >
                        Add to Favorite
                    </Button>
                </Card.Footer>
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
    // onBackClick: PropTypes.func.isRequired,
}

export default MovieCard
