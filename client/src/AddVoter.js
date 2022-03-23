import React, {Component} from "react";
import VotingContract from "./contracts/VotingContract.json";
import getWeb3 from "./getWeb3";

import { FormGroup, FormControl, Button } from 'react-bootstrap';

import NavbarAdmin from "./NavbarAdmin"
import Navbar from "./Navbar"

class AddVoter extends Component {
    state = {
            account: null,
            web3: null,
            contract: null,
            name:'',
            voterId:'',
            voterAddress:'',
            candidates: null,
            hasVoted: false,
            isOwner:false
        }

    updateName = event => {
        this.setState({ name: event.target.value});
    }

    updateVoterAddress = event => {
        this.setState({voterAddress: event.target.value});
    }

    updateVoterId = event => {
        this.setState({voterId : event.target.value});
    }

    addVoter = async() => {
        await this.state.VotingInstance.methods.manualAddVoter(this.state.name, this.state.voterId, this.state.voterAddress, this.state.hasVoted).send({from: this.state.account});
        //Reload
        window.location.reload(false);
    }

    componentDidMount = async () => {
        //For refreshing page only once - 
        if(!window.location.hash){
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        try {
            //Get network provider and web3 instance.
            const web3 = await getWeb3();

            //Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            //Get the contract instance. 
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = VotingContract.networks[networkId];
            const instance = new web3.eth.Contract(
                VotingContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            //Set web3, accounts and contract to the state, and then proceed with an 
            // example of interacting with the contract's methods.

            //this.setState({ web3, accounts, contract: instance }, this.runExample);
            this.setState({ VotingInstance: instance, web3: web3, account: accounts[0] });

            // let voterCount = await this.state.VotingInstance.methods.getVoterCount().call();

            // let registered;
            // for(let i=0; i<voterCount; i++){
            //     let voterAddress = await this.state.VotingInstance.methods.voters(i).call();
            //     if(voterAddress === this.state.account){
            //         registered = true;
            //         break;
            //     }
            // }

            // this.setState({registered: registered});

            const owner = await this.state.VotingInstance.methods.getOwner().call();
            if(this.state.account === owner) {
                this.setState({isOwner : true});
            }
        }catch (error) {
            //Catch any errors for any of the above operations.
            alert(
                'Failed to load web3. accounts, or contract. Check console for details.',
            );
            console.error(error);
        }
    };

    render() {
        if(!this.state.web3) {
            return(
                <div className="CandidateDetails">
                    <div className="CandidateDetails-title">
                        <h1>
                            Loading Web3, accounts, and contract..
                        </h1>
                    </div>
                {this.state.isOwner ? <NavbarAdmin />: <Navbar />}
                </div>
            );
        }

        // if(this.state.registered){
        //     return(
        //         <div className="CandidateDetails">
        //         <div className="CandidateDetails-title">
        //           <h1>
        //           ALREADY REQUESTED TO REGISTER
        //           </h1>
        //         </div>
        //         {this.state.isOwner ? <NavbarAdmin />: <Navbar />}
        //       </div>
        //       );
        //     }

        if(!this.state.isOwner){
            return(
              <div className="CandidateDetails">
                <div className="CandidateDetails-title">
                  <h1>
                    ONLY ADMIN CAN ACCESS
                  </h1>
                </div>
              {this.state.isOwner ? <NavbarAdmin />: <Navbar />}
              </div>
            );
          }


        return (
            <div className="App background-blue">
            {this.state.isOwner ? <NavbarAdmin />: <Navbar />}
            <br></br>
            <div className="CandidateDetails">
              <div className="CandidateDetails-title">
                <h1 className="heading-title">
                  VOTER FORM
                </h1>
              </div>
            </div>
        
            
        
            <div className="form">
            <FormGroup>
                <div className="form-label">Enter Name</div>
                <div className="form-input">
                  <FormControl  
                      input = 'text'
                      value = {this.state.name}
                      onChange={this.updateName}
                  />
                </div>
            </FormGroup>
        
            <FormGroup>
                <div className="form-label">Enter Voter ID</div>
                <div className="form-input">
                  <FormControl
                      input = 'textArea'
                      value = {this.state.voterId}
                      onChange={this.updateVoterId}
                  />
                </div>
            </FormGroup>
        
            <FormGroup>
                <div className="form-label">Enter Voter Address</div>
                <div className="form-input">
                  <FormControl
                      input = 'text'
                      value = {this.state.voterAddress}
                      onChange={this.updateVoterAddress}
                  />
                </div>
            </FormGroup>
            <Button onClick={this.addVoter}  className="btn btn-lg w-100 btn-primary">
              Add Voter
            </Button>
            </div>
                
          </div>
        );
    }
}

export default AddVoter;