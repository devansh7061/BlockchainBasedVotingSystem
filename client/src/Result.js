import React, { Component } from "react";
import VotingContract from "./contracts/VotingContract.json";
import getWeb3 from "./getWeb3";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

class Result extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    toggle: false,
    result: '',
    start: false,
    isOwner: false,
  };

//   electionResults = async () => {
//     await this.state.VotingInstance.methods
//       .electionResults(this.state.name, this.state.details)
//       .send({ from: this.state.account, gas: 1000000 });
//     // Reload
//     window.location.reload(false);
//   };

//   viewWinner = async () => {
//     await this.state.VotingInstance.methods
//       .viewWinner(this.state.name, this.state.details)
//       .send({ from: this.state.account, gas: 1000000 });
//     // Reload
//     window.location.reload(false);
//   };
  result = async () => {
    await this.state.VotingInstance.methods.electionResults().call();
    let winner = await this.state.VotingInstance.methods.viewWinner().call();
    this.setState({result : winner});
  }

  componentDidMount = async () => {
    // FOR REFRESHING PAGE ONLY ONCE -
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

      this.setState({
        VotingInstance: instance,
        web3: web3,
        account: accounts[0],
      });

      const owner = await this.state.VotingInstance.methods.getOwner().call();
      if (this.state.account === owner) {
        this.setState({ isOwner: true });
      }

      let start = await this.state.VotingInstance.methods
        .electionStatus()
        .call();

      this.setState({ start: start });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    if (this.state.start) {
      return (
        <>
          <Navbar />
          <div className="CandidateDetails">
            <div className="CandidateDetails-title">
              <h1>Voting is still going on.</h1>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="background-blue">
        <Navbar />
        <div className="vote-button text-center">
            <Button onClick={this.result} className="button-Vote">
              View Results
            </Button>
          </div>
        <br></br>
        <div className="h5 winner">
            <p>The winner is {this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default Result;