import React from "react";
import {Link} from 'react-router-dom';

function Navbar () {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Vote Block
          </a>
          
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#Dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <Link to='/Result' className="nav-link active">
                  Results
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/AddCandidate' className="nav-link active">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;