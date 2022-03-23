import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import AddCandidate from "./AddCandidate";
import StartPoll from './StartPoll';
import Result from './Result';
import AddVoter from './AddVoter';
import Vote from './Vote';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { render } from "react-dom";
// import history from "./history";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/AddCandidate" element={<AddCandidate />} />
            <Route path="/StartPoll" element={<StartPoll />} />
            <Route path="/Result" element={<Result />} />
            <Route path="/AddVoter" element={<AddVoter />} />
            <Route path="/Vote" element={<Vote />} /> 
            
        </Routes>
    </BrowserRouter>,
    rootElement);
// ReactDOM.render(
//   <Routes>
//     <Route exact path="/" element={<App />} />
//   </Routes>,

//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();