import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Fade } from "react-reveal";
import { Navbar, Nav, Row, Col } from 'react-bootstrap'
import { openNav, closeNav } from "../Miscellaneous";

import './Header.scss'
//Apollo and graphql
import { graphql, compose } from "react-apollo";
import { getFav, removeFav } from "../../queries/queries";
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleSearch: false,
			toggleNav: false
		}
	}
	addFavourate = (e, item) => {
		e.preventDefault();
		this.props.removeFav({
			variables: {
				carID: item.carID
			},
			//to refresh the data 
			refetchQueries: [{ query: getFav }]
		})
	}
	enableSearchBar = () => {
		(!this.state.toggleSearch) ? this.setState({ toggleSearch: true }) : this.setState({ toggleSearch: false })
	}
	toggleNavHandle = () => {
		(!this.state.toggleNav) ? this.setState({ toggleNav: true }) : this.setState({ toggleNav: false })
	}
	render() {
		return (
			<div>
				<Navbar collapseOnSelect expand="md" className="header_container">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={this.toggleNavHandle} />
					<Link className="title mr-auto" to='/'>carwow</Link>
					<Fade top>
						<div className={this.state.toggleSearch ? 'searchBar show' : 'hide'}>
							<input type='text' placeholder='Enter a car name ...'></input>
							<div className='close' onClick={() => this.enableSearchBar()} >x</div>
						</div>
					</Fade>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<NavLink
								activeClassName="nav_selected"
								to='/car-chooser'
								className={this.state.toggleSearch ? 'hide' : 'show'}>New Cars</NavLink>
							<NavLink
								activeClassName="nav_selected"
								to='/used-cars'
								className={this.state.toggleSearch ? 'hide' : 'show'}>Used Cars</NavLink>
							<NavLink
								activeClassName="nav_selected"
								to='/contact'
								className={this.state.toggleSearch ? 'hide' : 'show'}>Contact Us</NavLink>
							<NavLink
								activeClassName="nav_selected"
								to='/users/sign_in'
								className="d-md-none">Log In</NavLink>
						</Nav>
					</Navbar.Collapse>
					<Nav className="right_nav">
						<div onClick={() => this.enableSearchBar()} className={this.state.toggleSearch || this.state.toggleNav ? 'hide' : 'show'}>
							<i className="fas fa-search"></i>
						</div>
						<div onClick={openNav} id="openNav" className={this.state.toggleSearch || this.state.toggleNav ? 'hide' : 'show'}>
							<i className="fas fa-heart"></i>
						</div>
						<Link to='/users/sign_in'>
							<div className={"d-none d-md-block d-lg-block" + this.state.toggleSearch ? 'd-none d-md-block d-lg-block' : 'hide'}>
								<i className="far fa-user"><span>Login</span></i>
							</div>
						</Link>
					</Nav>
				</Navbar>
				<div id="mySidenav" className="sidenav" style={{ right: 0 }}>
					<div className="head">
						<h3>
							Your favourites
            				</h3>
						<p className="closebtn" onClick={closeNav}>X</p>
					</div>
					{/* JSX */}
					{
						this.props.getFav.loading
							// render when loading is true
							? <div className="fav_container">
								loading ...
                				</div>
							: this.props.getFav.user.fav.length === 0
								//render if the iist of fav car is empty
								? <div className="fav_container">
									<h3>You currently have no cars saved</h3>
									<p>To add cars to your favourites, simply tap on the heart</p>
									<div className="No_car_image"></div>
								</div>
								// render the list of fav car
								: this.props.getFav.user.fav.map((item, index) => {
									return (
										<Fade left key={index} >
											<Row className="fav_list_container">
												<Col>
													<img src={`/assets/images/CAR/${item.brand}/${item.image[0]}`} width="100%"
														alt={item.brand + " " + item.model} />
												</Col>
												<Col className="fav_detail">
													<div className="logo">
														<img src={`/assets/images/logo/${item.brand}-logo.png`} alt={item.brand} width="60px" />
													</div>
													<div className="fav_brand">
														{item.brand + " " + item.model}
													</div>
													<span>
														Rs. {item.price}
													</span>
													<button id="favHeart"
														onClick={e => this.addFavourate(e, item)}>
														<i className="fas fa-heart fav"></i>
													</button>
												</Col>
											</Row>
										</Fade>

									)
								})
					}
				</div>
			</div >
		)
	}
}
export default compose(
	graphql(getFav, { name: 'getFav' }),
	graphql(removeFav, { name: 'removeFav' })
)(Header);
