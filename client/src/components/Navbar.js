import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Hamburger from './Hamburger';
import '../css/navbar.css';

const Navbar = () => {
  const [navbar, setNavbar] = useState (false);
  const [showDropdown, setShowDropdown] = useState (false);

  const handleNavbar = () => {
    setNavbar (!navbar);
  };

  const toggleDropdown = () => {
    setShowDropdown (!showDropdown);
  };

  const hideNavbar = () => {
    setNavbar (false);
    setShowDropdown (!showDropdown);
  };

  return (
    <div>
      <nav className={`navbar ${navbar && 'active'}`}>
        <div className="container">
          <div className="logo">Shopify</div>
          <div className="menu-icon" onClick={handleNavbar}>
            <Hamburger />
          </div>
          <div className={`nav-elements ${navbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/" activeclassname="active" onClick={hideNavbar}>
                  Home
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/occasion/christmas"
                  activeclassname="active" // This will apply the 'active' class when the link is active
                  onClick={toggleDropdown}
                >
                  Shop by Occasion
                </NavLink>
                {showDropdown &&
                  <ul className="dropdown-content">
                    <li>
                      <NavLink to="/occasion/christmas" onClick={hideNavbar}>
                        Christmas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/occasion/diwali" onClick={hideNavbar}>
                        Diwali
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/occasion/eid" onClick={hideNavbar}>
                        Eid
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/occasion/halloween" onClick={hideNavbar}>
                        Halloween
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/occasion/valentinesday"
                        onClick={hideNavbar}
                      >
                        Valentines Day
                      </NavLink>
                    </li>
                  </ul>}
              </li>
              <li>
                <NavLink
                  to="/cart"
                  activeclassname="active"
                  onClick={hideNavbar}
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
