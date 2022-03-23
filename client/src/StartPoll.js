import React, { Component } from "react";
import VotingContract from "./contracts/VotingContract.json";
import getWeb3 from "./getWeb3";
import { Button } from "react-bootstrap";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

class StartPoll extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    isOwner: false,
    start: false,
  };

  addCandidate = async () => {
    await this.state.VotingInstance.methods
      .addCandidate(this.state.name, this.state.details)
      .send({ from: this.state.account, gas: 1000000 });
    // Reload
    window.location.reload(false);
  };

  startElection = async () => {
    await this.state.VotingInstance.methods
      .startElection()
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload(false);
  };

  endElection = async () => {
    await this.state.VotingInstance.methods
      .endEelection()
      .send({ from: this.state.account});
    window.location.reload(false);
  };
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
    if (!this.state.isOwner) {
      return (
        <div>
          {this.state.isOwner ? <NavbarAdmin /> : <Navbar />}
          <div>
            <h1>ONLY ADMIN CAN ACCESS</h1>
          </div>
        </div>
      );
    }
    return (
      <body className="text-center background-blue">
        <NavbarAdmin />
        <div className="admin-buttons">
          {this.state.start ? (
            <Button
              onClick={this.startElection}
              className="admin-buttons-start-s"
            >
              Start Election
            </Button>
          ) : (
            <Button
              onClick={this.startElection}
              className="admin-buttons-start-e"
            >
              Start Election
            </Button>
          )}
          {this.state.start ? (
            <Button onClick={this.endElection} className="admin-buttons-end-s">
              End Election
            </Button>
          ) : (
            <Button onClick={this.endElection} className="admin-buttons-end-e btn-danger">
              End Election
            </Button>
          )}
        </div>
      </body>
    );
  }
}
export default StartPoll;