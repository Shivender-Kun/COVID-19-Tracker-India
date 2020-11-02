import React from "react";
import "./navbar.css";
function NavBar() {
    return (
        <div className="navBar">
            <div className="covid-india">
                <a href="/">COVID-19</a>
                <br />
                <span>India</span>
            </div>
            <div className="nav-icons">
                <a href='/'><svg className="home-icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg></a>
                <div className="about-icon">
                    
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
