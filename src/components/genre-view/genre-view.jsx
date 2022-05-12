import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { setGenres } from "../../actions/actions"

import "./genre-view.scss"

import { Row, Col, Button } from "react-bootstrap"

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props

        return (
            <>
                <Row>
                    <Col
                        med={4}
                        className="genre-view bg-light text-black"
                        style={{ marginTop: 150 }}
                    >
                        <div className="genre-name" />
                        <span className="label">Genre: </span>
                        <span className="value">{genre.Name}</span>
                    </Col>
                </Row>
                <Row>
                    <Col med={4} className="genre-view bg-light text-black">
                        <div className="genre-description" />
                        <span className="label">Description: </span>
                        <span className="value">{genre.Description}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                                onBackClick(null)
                            }}
                            variant="danger"
                            style={{ marginTop: 50 }}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </>
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
