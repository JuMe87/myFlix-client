import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./movie-view.scss"

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props

        return (
            <div
                className="movie-view bg-light text-black"
                style={{ marginTop: 150 }}
            >
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="true" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                </div>
                <button
                    onClick={() => {
                        onBackClick(null)
                    }}
                    variant="outline-dark"
                >
                    Back
                </button>
            </div>
        )
    }
}

MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired,
}

export default MovieView
