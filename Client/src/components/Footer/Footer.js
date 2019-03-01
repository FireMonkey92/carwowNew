import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className='footer_container' fixed="bottom">
                <div className='social_bar'>
                    <div className='social_bar_items'>
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
                <div className="rights_bar">
                    <div className="copyrights">
                        <span>© 2019 carwow Ltd. All rights reserved</span>
                    </div>
                    <div className="legel_Links">
                        <Link to='/tc'>Terms & conditions</Link>
                        <Link to='/pp'>Privacy policy</Link>
                        <Link to='/sm'>Sitemap</Link>
                    </div>
                </div>
                <div className="rights_bar">
                    <div className="fca_paragraph">
                        <p>
                            Average savings are calculated daily based on the best dealer prices on carwow vs manufacturer RRP. See more details here. We connect you with dealerships who provide offers on your configured car. carwow does not verify or endorse the offers. If you buy or lease a car you will arrange to do so directly with the dealership. carwow is the trading name of carwow Ltd, which is authorised and regulated by the Financial Conduct Authority for credit broking activities with the firm reference number: 767155.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;