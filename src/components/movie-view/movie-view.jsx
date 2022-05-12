import React from "react"
import PropTypes from "prop-types"
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

import "./movie-view.scss"

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props

        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card
                            style={{
                                marginTop: 100,
                                marginBottom: 50,
                                width: "30",
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={movie.ImagePath}
                                crossOrigin="true"
                            />
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre</Button>
                                </Link>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">Director</Button>
                                </Link>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={() => {
                                        onBackClick(null)
                                    }}
                                >
                                    Back
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
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
