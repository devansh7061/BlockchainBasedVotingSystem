import React from "react";
import Vote from './Vote';

function Dashboard() {
  return (
    <div>
      <div className="Dashboard" id="Dashboard">
        <p>Dashboard</p>
      </div>
      <div className="Votecard">
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card bg-primary text-white h-100">
              <div className="card-body py-5">Upcoming elections</div>
              <div className="card-footer d-flex">
                <a href="#" style={{ color:'white' }}>View Details</a>
                <span className="ms-auto">
                  <i className="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-warning text-dark h-100">
              <div className="card-body py-5">Expired elections</div>
              <div className="card-footer d-flex">
                <a href="/Result" style={{ color:'black' }}>View Details</a>
                <span className="ms-auto">
                  <i className="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-success text-white h-100">
              <div className="card-body py-5">Live elections</div>
              <div className="card-footer d-flex">
                <a href="/Vote" style={{ color:'white' }}>View Details</a>
                <span className="ms-auto">
                  <i className="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;