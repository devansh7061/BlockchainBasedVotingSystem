import React from "react";
import {Link} from 'react-router-dom';

function NavbarAdmin () {
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
                <Link to='/AddCandidate' className="nav-link active">
                  Add Candidate
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/AddVoter' className="nav-link active">
                  Add Voter
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/StartPoll' className="nav-link active">
                  Start/End Poll
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/Result' className="nav-link active">
                  Results
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavbarAdmin;