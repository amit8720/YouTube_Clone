import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="home-container" >
            <div className="hero-card">
                <header className="card-header">
                    <div className="header-logo">
                        <Link to="/" className="logo-link">

                            <img
                                src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid"
                                alt="Shopping Cart"
                                className="cart-icon"
                            />
                            Shoppy Globe
                        </Link>
                    </div>

                </header>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Welcome to Our <span>Store</span>
                        </h1>
                        <p className="hero-subtitle">Discover the convenience of online shopping with Shoppy Globe. Browse our extensive collection and find your favorites today. Experience the joy of shopping at your fingertips!</p>
                        <Link to={localStorage.getItem("id") == null ? '/login' : '/explore'} className="hero-button">Shop Now</Link>
                    </div>
                    <div className="hero-image">
                        <img src="https://softrockindia.com/wp-content/uploads/2020/12/ecommerce-services.jpg" alt="E-commerce services" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
