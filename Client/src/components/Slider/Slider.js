import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import { Container, Row, Col } from 'react-bootstrap';
//CSS
import './Slider.scss';
//Apollo and graphql
import { graphql } from "react-apollo";
import { getAllBrands } from "../../queries/queries";
class Slider extends Component {
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("Home").style.opacity = '1';
        document.body.style.transition = 'all 0.5s ease-in-out';
    }
    render() {
        return (
            <div className="main_cover" onClick={this.closeNav}>
                <div id="slider" style={{ backgroundImage: `url(./assets/images/Basic/slider_mustag.jpg)` }}>
                    <div className="slider_info">
                        <Bounce top>
                            <h3 className="d-none d-md-block">The smarter way to buy your new car</h3>
                        </Bounce>
                        <Bounce >
                            <p className="d-none d-md-block">our perfect car, compare offers from local and national dealers and buy at a price that’s right for you.</p>
                        </Bounce>
                        <a href="#carbrand">
                            <button className="select_car" onClick={this.handleShow}>
                                Select a car
                            </button>
                        </a>
                        <button className="not_sure">
                            <Link to="/car-chooser">Not sure what you want?</Link>
                        </button>
                    </div>
                </div>
                <div className="brandlist_container" id="carbrand">
                    <Container className="list">
                        <h3>Choose your car brand</h3>
                        <hr />
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <ul className="m-auto">
                                    {
                                        !this.props.data.loading ?
                                            this.props.data.brands.map(item => {
                                                return (
                                                    <li key={item.id}>
                                                        <Link to={`/car-chooser/${item.brand}`}>
                                                            <img src={`./assets/images/logo/${item.image}`} alt={item.brand} />
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                            : <div>Loading ...</div>
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        )
    }
}
export default graphql(getAllBrands)(Slider);