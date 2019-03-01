import React, { Component } from 'react'
import ProductCard from '../Product_card/Product_card';
import { openSort, closeSort, openFilters, closeFilters } from "../Miscellaneous";
import { graphql, compose } from "react-apollo";
import { getAllBrands, getAllCars } from "../../queries/queries";
import './Car_choose.scss'
class Car_Choose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBrandChecked: {},
            isSeatsChecked: {},
            isFuelChecked: {},
            queryBrand: [],
            querySeats: [],
            queryFuel: [],
            carListLength: 0
        }
    }
    HandleChange = (e, item, type) => {
        //Brand Filter
        if (type === 'brand') {
            let isBrandChecked = this.state.isBrandChecked;
            isBrandChecked[item.brand] = e.target.checked;
            this.setState({ isBrandChecked })
            let qb = this.state.isBrandChecked;
            let queryBrand = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            queryBrand.push(key)
                    }
                }
            }
            this.setState({ queryBrand })
        }
        //Seats Filter
        if (type === 'seats') {
            let isSeatsChecked = this.state.isSeatsChecked;
            isSeatsChecked[item] = e.target.checked;
            this.setState({ isSeatsChecked })
            let qb = this.state.isSeatsChecked;
            let querySeats = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            querySeats.push(key)
                    }
                }
            }
            this.setState({ querySeats })
        }
        //Fuel Filter
        if (type === 'fuel') {
            let isFuelChecked = this.state.isFuelChecked;
            isFuelChecked[item] = e.target.checked;
            this.setState({ isFuelChecked })
            let qb = this.state.isFuelChecked;
            let queryFuel = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            queryFuel.push(key)
                    }
                }
            }
            this.setState({ queryFuel })
        }
    }
    componentWillMount = () => {
        if (this.props.match.params.brand) {
            let queryBrand = [];
            queryBrand.push(this.props.match.params.brand);
            this.setState({ queryBrand })
        }
        else {
            this.setState({ queryBrand: [] })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div id="Sort" className="sidenav" style={{ right: 0 }}>
                        <div className="head">
                            <h3>
                                Sort
            				</h3>
                            <p className="closebtn" onClick={closeSort}>X</p>
                        </div>
                        <div>
                            <input type="radio" name="sort" value="acces" />Price (Low to High)<br />
                            <input type="radio" name="sort" value="desc" /> Price (High to Low)<br />
                            <input type="radio" name="sort" value="make" /> Make (A-Z)<br />
                        </div>
                    </div>
                    <div id="Filters" className="sidenav" style={{ left: 0 }}>
                        <div className="head">
                            <h3>
                                Filters
            				</h3>
                            <p className="closebtn" onClick={closeFilters}>X</p>
                        </div>
                        <div >
                            <div className="slide-card">
                                {/* Brand */}
                                <div className="parent1">
                                    <div className="header1">
                                        <h3>Brand <span><i className="fa fa-arrow-right"></i></span></h3>
                                    </div>
                                    <div className="content1">
                                        <form>
                                            {
                                                !this.props.getAllBrands.loading ?
                                                    this.props.getAllBrands.brands.map((item, index) => {
                                                        return (
                                                            <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                                <label style={{ margin: 0 }}>{item.brand}</label>
                                                                <input type="checkbox" name="brand" value={item.brand}
                                                                    onChange={e => this.HandleChange(e, item, 'brand')} />
                                                            </div>
                                                        )
                                                    })
                                                    : ""
                                            }
                                        </form>
                                    </div>
                                </div>
                                {/* Seats */}
                                <div className="parent2">
                                    <div className="header2">
                                        <h3>Seats <span><i className="fa fa-arrow-right"></i></span></h3>
                                    </div>
                                    <div className="content2">
                                        {
                                            ["2", "4", "5", "6", "7"].map((item, index) => {
                                                return (
                                                    <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                        <label style={{ margin: 0 }}>{item} Seat </label>
                                                        <input type="checkbox" name="brand" value={item}
                                                            onChange={e => this.HandleChange(e, item, 'seats')} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/* Fuel-type */}
                                <div className="parent3">
                                    <div className="header3">
                                        <h3>Fuel-type <span><i className="fa fa-arrow-right"></i></span></h3>
                                    </div>
                                    <div className="content3">
                                        {
                                            ["Petrol", "Electric(Battery)", "Diesel"].map((item, index) => {
                                                return (
                                                    <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                        <label style={{ margin: 0 }}>{item}</label>
                                                        <input type="checkbox" name="brand" value={item}
                                                            onChange={e => this.HandleChange(e, item, 'fuel')} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="car_chooser" id="car_chooser">
                    <div className="card_filter">
                        <div className="card_filter_header">
                            <h1>Car chooser</h1>
                            <p>Let us help you find your perfect car</p>
                        </div>
                        <div className="card_filter_custom">
                            <button onClick={openFilters} id="openFilter">Filters</button>
                            <button onClick={openSort} id="openSort">Sort</button>
                        </div>
                    </div>
                    <div className="cc_cars_container">
                        <div className="cc_cars">
                            <ProductCard
                                queryBrand={this.state.queryBrand}
                                querySeats={this.state.querySeats}
                                queryFuel={this.state.queryFuel}
                                carlength={(len) => this.carlength(len)} />
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}
export default compose(
    graphql(getAllCars),
    graphql(getAllBrands, { name: 'getAllBrands' })
)(Car_Choose);
