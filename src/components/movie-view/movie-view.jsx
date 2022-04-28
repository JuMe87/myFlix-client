import React from "react"
import PropTypes from "prop-types"

import "./movie-view.scss"

export class MovieView extends React.Component {
    keypressCallback(event) {
        alert(event.key)
    }
    componentDidMount() {
        document.addEventListener("keypress", this.keypressCallback)
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.keypressCallback)
    }

    render() {
        const { movie, onBackClick } = this.props

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img crossOrigin="true" src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button
                    onClick={() => {
                        onBackClick(null)
                    }}
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
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}

export default MovieView
