import React from "react"
import PropTypes from "prop-types"
import "./director-view.scss"

import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from "react-bootstrap"

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props

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
                            <Card.Body>
                                <div className="director-name" />
                                <span className="label">Director: </span>
                                <span className="value">{director.Name}</span>

                                <div className="director-name" />
                                <span className="label">Bio: </span>
                                <span className="value">{director.Bio}</span>

                                <div className="director-name" />
                                <span className="label">Birth: </span>
                                <span className="value">{director.Birth}</span>

                                <div className="director-name" />
                                <span className="label">Death: </span>
                                <span className="value">{director.Death}</span>

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

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}

export default DirectorView
