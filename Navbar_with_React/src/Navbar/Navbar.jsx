import React from "react";
import "./Navbar.css";
import logo_black from "../assets/logo-black.png";
import logo_white from "../assets/logo-white.png";
import PropTypes from 'prop-types';
import {Routes,Route,Link} from 'react-router-dom'

const Navbar = ({theme,setTheme}) => {

    function toggleTheme() {
        theme  === 'light' ? setTheme('dark') : setTheme('light');

    }
console.log( theme );


  return (
    <div className={`navbar ${theme == "dark" ? "dark" :"light"}`}>
      <div className="image">
        <img src={theme == "light" ? logo_black : logo_white} alt="White logo" />
      </div>

      <div className="links">
        <ul className={` ${theme == "dark" ? "dark" :"light"}`}>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>
          <li>
            <Link to={'/new'}>New</Link>
          </li>
        </ul>
      </div>
      {
        
      }
      <div className="right-container">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className={`search-icon ${theme == "dark" ? "dark" :"light"}`}>
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>

          <input
            id="query"
            className={`input ${theme == "dark" ? "dark" :"light"}`}
            type="search"
            placeholder="Search..."
            name="searchbar"
          />
        </div>

        
        <input onClick={toggleTheme} type="checkbox" className="theme-checkbox"/>
      </div>
    </div>
  );
};

Navbar.propTypes = {
    theme: PropTypes.string.isRequired, // Ensures `theme` is a string and required
    setTheme: PropTypes.func.isRequired, // Ensures `setTheme` is a function and required
  };
  

export default Navbar;
