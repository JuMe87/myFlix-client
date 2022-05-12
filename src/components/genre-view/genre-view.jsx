import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { setGenres } from "../../actions/actions"

import "./genre-view.scss"

import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from "react-bootstrap"

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props

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
                                <Card.Title>
                                    <span className="label">Genre: </span>
                                    <span className="value">{genre.Name}</span>
                                </Card.Title>
                                <Card.Text>
                                    <span className="value">
                                        {genre.Description}
                                    </span>
                                </Card.Text>

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

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}

let mapStateToProps = (state) => {
    return { genres: state.genres }
}
export default connect(mapStateToProps, { setGenres })(GenreView)
