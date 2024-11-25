import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/juice">Juice</Link>
        <Link to="/oil">Oil</Link>
        <Link to="/user_profile">MyProfile</Link>
        <Link to="/mycart">MyCart</Link>
        <Link to={`/admin/admin_panel`}>Admin</Link>
      </div>
      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} MyShop || Ayodhya 224001 U.P. || All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
