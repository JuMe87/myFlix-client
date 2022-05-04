import React from "react"
import { Link } from "react-router-dom"
import { Col, Row, Figure, Button } from "react-bootstrap"
import axios from "axios"

function FavoriteMovies({ favoriteMovieList }) {
    const removeFav = (id) => {
        let token = localStorage.getItem("token")
        let url = `https://julesmyflixdb.herokuapp.com/users/${localStorage.getItem(
            "user"
        )}/movies/${id}`
        axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
                {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
                    return (
                        <Col xs={12} md={6} lg={3} key={_id}>
                            <Figure>
                                <Link to={"/movies/${_id}"}>
                                    <Figure.Image src={ImagePath} alt={Title} />
                                    <Figure.Caption>{Title}</Figure.Caption>
                                </Link>
                            </Figure>
                            <button
                                variant="danger"
                                onClick={() => removeFav(_id)}
                            >
                                Remove from the list
                            </button>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default FavoriteMovies
