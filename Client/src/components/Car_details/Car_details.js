import React, { Component } from "react";
import Slider from "react-slick";
import { graphql } from "react-apollo";
import {
  Row,
  Col,
  Container,
  Button,
  OverlayTrigger,
  Popover
} from "react-bootstrap";

import { getSingleCar } from "../../queries/queries";
import "./Car_details.scss";

// import model
import ContactDealersModel from "./Contact_dealers_model";

class Car_Detail extends Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false };
  }
  popover = (
    <Popover id="popover-basic" title="Share with...">
      <div style={{ display: "flex", flexFlow: "row", padding: "0px 25px" }}>
        <i
          className="fab fa-facebook"
          aria-hidden="true"
          style={{
            fontSize: "27px",
            color: "#3b5998",
            margin: "10px",
            cursor: "pointer"
          }}
        />
        <i
          className="fab fa-whatsapp"
          aria-hidden="true"
          style={{
            fontSize: "27px",
            color: "#25D366",
            margin: "10px",
            cursor: "pointer"
          }}
        />
      </div>
    </Popover>
  );

  renderCarDetail = ({ data }) => {
    let settings = {
      customPaging: function(i) {
        return (
          <a href="#">
            <img
              className="carslick_icon"
              src={`/assets/images/CAR/${data.car.brand}/${data.car.image[i]}`}
              alt={data.car.image[i]}
            />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    //function to close the modal
    let modalClose = () => this.setState({ modalShow: false });

    if (data.loading) {
      return <div>loading...</div>;
    } else {
      let car = data.car;
      if (car)
        if (car.image) {
          return (
            <Container className="py-5 px-0">
              <Row className="p-0 mb-5 car_detail_container">
                <Col
                  md={{ span: 5, offset: 2 }}
                  sm={{ span: 10, offset: 1 }}
                  xs={12}
                  className="m-auto"
                >
                  <Slider {...settings}>
                    {car.image.map((item, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={`/assets/images/CAR/${car.brand}/${item}`}
                            alt={item}
                            className="carslick"
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </Col>
                <Col md={7} sm={10} className="mx-auto car_major_details px-2">
                  <img
                    src={`/assets/images/logo/${car.brand}-logo.png`}
                    alt={car.brand}
                    width="100px"
                  />

                  <OverlayTrigger
                    trigger="click"
                    rootClose='true'
                    placement="left"
                    overlay={this.popover}
                  >
                    <i className="fa fa-share-alt" aria-hidden="true" />
                  </OverlayTrigger>

                  <h4 className="pb-3">
                    {car.brand} {car.model}
                  </h4>
                  <h5 className="pt-3">Rs {car.price}*</h5>
                  <span>*Ex-showroom Price</span>
                  <br />
                  <br />
                  <Button variant={"primary"}   onClick={() => this.setState({ modalShow: true })} className="py-2 px-5">
                    Contact Dealers
                  </Button>
                  <br />
                  <br />
                  <span>
                    <i className="fa fa-tag" aria-hidden="true" /> Don't miss
                    out on the festive offers this month
                  </span>
                </Col>
              </Row>
              <div className="keySpec_container">
                <Row className="pb-5 pt-4">
                  <Col>
                    <h4 className="pb-3">Key Specs of {car.model}</h4>
                  </Col>
                </Row>
                <Row className="text-center keySpec">
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/speed.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Mileage</span>
                    <br />
                    {car.keySpecs.mileage} kM/L
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/engine.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Engine</span>
                    <br />
                    {car.keySpecs.engine} CC
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/lightning-bolt.png"
                      alt="ICON"
                    />
                    <br />
                    <span>BHP</span>
                    <br />
                    {car.keySpecs.bhp}
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/settings-3.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Gear</span>
                    <br />
                    {car.keySpecs.transmission}
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/sedan.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Boot Space</span>
                    <br />
                    {car.keySpecs.bootspace} Litres
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/airbag-on.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Airbags</span>
                    <br />
                    {car.keySpecs.airbags}
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/flight-seat.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Seats</span>
                    <br />
                    {car.keySpecs.seats}
                  </Col>
                  <Col md={4} xs={4} lg={3}>
                    <img
                      src="https://img.icons8.com/ios/50/000000/gas-station.png"
                      alt="ICON"
                    />
                    <br />
                    <span>Fuel-Type</span>
                    <br />
                    {car.keySpecs.fueltype}
                  </Col>
                </Row>
              </div>
              <ContactDealersModel
                show={this.state.modalShow}
                onHide={modalClose}
              />
            </Container>
          );
        }
    }
  };
  render() {
    return <div>{this.renderCarDetail(this.props)}</div>;
  }
}
export default graphql(getSingleCar, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
})(Car_Detail);
