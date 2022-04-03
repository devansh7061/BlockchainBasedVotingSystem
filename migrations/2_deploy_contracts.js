var VotingContract = artifacts.require("./VotingContract.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingContract, '0x847c34B56c0203A193d3CD3B96b8915C044fFfC7');
};