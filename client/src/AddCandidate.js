import React, { Component } from "react";
import VotingContract from "./contracts/VotingContract.json";
import getWeb3 from "./getWeb3";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

class AddCandidate extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    candidates: null,
    name: "",
    details: "",
    isOwner: false,
  };
  updateName = (event) => {
    this.setState({ name: event.target.value });
  };
  updateDetails = (event) => {
    this.setState({ details: event.target.value });
  };

  addCandidate = async () => {
    await this.state.VotingInstance.methods
      .addCandidate(this.state.name, this.state.details)
      .send({ from: this.state.account });
    // Reload
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
      <body className="background-blue">
        <NavbarAdmin />
        <br></br>
        <h1 className="heading-title">Add Candidate</h1>
        <div className="form">
          <FormGroup>
            <div className="form-label">Enter Name</div>
            <div className="form-input">
              <FormControl
                input="text"
                value={this.state.name}
                onChange={this.updateName}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div className="form-label">Enter Details</div>
            <div className="form-input">
              <FormControl
                input="text"
                value={this.state.details}
                onChange={this.updateDetails}
              />
            </div>
          </FormGroup>
          <div className="vote-button">
            <Button onClick={this.addCandidate} className="btn btn-lg w-100 btn-primary">
              Add
            </Button>
          </div>
        </div>
      </body>
    );
  }
}
export default AddCandidate;