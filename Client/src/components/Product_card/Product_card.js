import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Product_card.scss"
// import react-bootstrap
import { Row, Col, Card, Button } from 'react-bootstrap'
// Apollo and graphql
import { graphql, compose } from "react-apollo";
import { addFav, getFav, getAllCars } from "../../queries/queries";
class ProductCard extends Component {
    addFavourate = (e, item) => {
        e.preventDefault();
        let status = false;
        if (this.props.getFav.user)
            this.props.getFav.user.fav.forEach(element => {
                if (element.model === item.model)
                    status = true;

            })

        this.props.addFav({
            variables: {
                carID: item.id,
                userID: "5c665c8cfb6fc01c4ce4d1dc",
                image: item.image,
                brand: item.brand,
                model: item.model,
                price: item.price
            },
            //to refresh the data 
            refetchQueries: [{ query: getFav }]
        })
        if (status)
            toast.warn("you have already added this to favorites !", {
                position: toast.POSITION.TOP_RIGHT
            })
        else
            toast.success("Added to favorites !", {
                position: toast.POSITION.TOP_RIGHT
            });
    }

    render() {
        return (
            <Row className="m-auto">
                {!this.props.data.loading
                    ? this.props.data.carList.map(item => {
                        return (
                            <Col md={6} lg={4} sm={{ span: 8, offset: 2 }} xs={12} className="m-0 p-0" key={item.id}>
                                <Card>
                                    <button id="favHeart"
                                        onClick={e => { this.addFavourate(e, item) }}>
                                        <i>+</i>
                                    </button>
                                    <ToastContainer autoClose={3000} />
                                    <Card.Img variant="top" src={`/assets/images/CAR/${item.brand}/${item.image[0]}`} height="250px" width="100%" />
                                    <Card.Body>
                                        <Row>
                                            <Col md={3} >
                                                <img src={`/assets/images/logo/${item.brand}-logo.png`} alt={item.brand} width="60px" />
                                            </Col>
                                            <Col md={9} >
                                                <div className="card-generic_product-brand-name" variant="success">
                                                    {item.brand}
                                                </div>
                                                <div className="card-generic_product-name">
                                                    {item.model}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Card.Footer>
                                            <div className="price">
                                                <b>Prices</b>
                                                <p className="muted">{item.price}</p>
                                            </div>
                                            <Link to={`/car-chooser/${item.brand}/${item.model}/${item.id}`}>
                                                <Button variant="success" size="lg" block>
                                                    Available deals
                                                </Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                    : <div>Loading ...</div>
                }
            </Row >
        )
    }
}
export default compose(
    //when using query don't use name property of that query
    //use by this.props.data only 
    graphql(getAllCars, {
        options: (props) => {
            return {
                variables: {
                    brand: props.queryBrand,
                    seats: props.querySeats,
                    fuel: props.queryFuel
                }
            }
        }
    }),
    graphql(addFav, { name: 'addFav' }),
    graphql(getFav, { name: 'getFav' }),
)(ProductCard);