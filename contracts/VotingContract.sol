pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// SPDX-License-Identifier: MIT

contract VotingContract is ERC2771Context {
    
    constructor(address _trustedForwarder) public ERC2771Context(_trustedForwarder){
        owner = _msgSender();
    }
    address owner;

    address trustedForwarder;

    uint256 candidateCount = 0;

    uint256 voterCount = 0;

    bool start;

    string pollName;

    //Struct
    // struct EIP712Domain {
    //     string name;
    //     string version;
    //     uint256 chainId;
    //     address verifyingContract;
    // }

    // struct MetaTransaction {
    //     uint256 nonce;
    //     address from;
    // }

    // mapping(address => uint256) public nonces;

    // bytes32 internal constant EIP712_DOMAIN_TYPEHASH =
    //     keccak256(
    //         bytes(
    //             "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    //         )
    //     );
    // bytes32 internal constant META_TRANSACTION_TYPEHASH =
    //     keccak256(bytes("MetaTransaction(uint256 nonce,address from)"));
    // bytes32 internal DOMAIN_SEPARATOR =
    //     keccak256(
    //         abi.encode(
    //             EIP712_DOMAIN_TYPEHASH,
    //             keccak256(bytes("Quote")),
    //             keccak256(bytes("1")),
    //             4, // Rinkeby
    //             address(this)
    //         )
    //     );
    // Struct of a voter
    struct Voter {
        string name;
        string voterId; // Roll number or any other number
        address voterAddress; // Wallet address
        bool hasVoted;
    }

    mapping(address => Voter) public voterAddresses;

    // Struct of a candidate
    struct Candidate {
        uint256 candidateId;
        string name;
        string details; // manifesto or any other description
        uint256 voteCount; // the number of votes he got
    }

    mapping(uint256 => Candidate) public candidateDetails;

    uint256[] private candidateVote;

    // Modifier for letting only the owner to add candidates
    modifier onlyOwner() {
        require(_msgSender() == owner, "only Owner");
        _;
    }

    // constructor(address _trustedForwarder) public {
    //     owner = msg.sender;
    //     trustedForwarder = _trustedForwarder;
    // }

    // function to add a new candidate
    function addCandidate(string memory _name, string memory _details)
        public
        onlyOwner
    {
        Candidate memory newCandidate = Candidate({
            candidateId: candidateCount,
            name: _name,
            details: _details,
            voteCount: 0
        });

        candidateDetails[candidateCount] = newCandidate;

        candidateCount += 1;
    }

    // function to add voter
    // only suitable for a local blockchain
    function manualAddVoter(
        string memory _name,
        string memory _voterId,
        address _voterAddress,
        bool _hasVoted
    ) public onlyOwner {
        Voter memory newVoter = Voter({
            name: _name,
            voterId: _voterId,
            voterAddress: _voterAddress,
            hasVoted: _hasVoted
        });

        voterAddresses[_voterAddress] = newVoter;

        voterCount += 1;
    }

    // actual function to add voters shouldbe done by an oracle
    // work on this later

    // the actual voting function
    function vote(uint256 _candidateId) public {
        require(voterAddresses[_msgSender()].hasVoted == false);
        require(start == true);
        candidateDetails[_candidateId].voteCount += 1;
        voterAddresses[_msgSender()].hasVoted = true;
    }

    //voting function for meta transaction
    // function voteMeta(
    //     uint256 _candidateId,
    //     address userAddress,
    //     bytes32 r,
    //     bytes32 s,
    //     uint8 v
    // ) public {
    //     MetaTransaction memory metaTx = MetaTransaction({
    //         nonce: nonces[userAddress],
    //         from: userAddress
    //     });

    //     bytes32 digest = keccak256(
    //         abi.encodePacked(
    //             "\x19\x01",
    //             DOMAIN_SEPARATOR,
    //             keccak256(
    //                 abi.encode(
    //                     META_TRANSACTION_TYPEHASH,
    //                     metaTx.nonce,
    //                     metaTx.from
    //                 )
    //             )
    //         )
    //     );

    //     require(userAddress != address(0), "invalid-address-0");
    //     require(
    //         userAddress == ecrecover(digest, v, r, s),
    //         "invalid-signatures"
    //     );
    //     require(voterAddresses[userAddress].hasVoted == false);
    //     require(start == true);
    //     candidateDetails[_candidateId].voteCount += 1;
    //     voterAddresses[userAddress].hasVoted = true;
    //     nonces[userAddress]++;
    // }

    // onlyOwner function for starting the election
    function startElection() public onlyOwner {
        start = true;
    }

    // onlyOwner function to end election
    function endEelection() public onlyOwner {
        start = false;
    }

    // public function to view election status (use this in dashboard)
    function electionStatus() public view returns (bool) {
        return (start);
    }

    uint256 winner = 0;

    // function to view election results
    function electionResults() public onlyOwner returns (uint256) {
        require(start == false);

        for (uint256 i = 0; i < candidateCount; i++) {
            candidateVote.push(candidateDetails[i].voteCount);
        }
        for (uint256 i = 1; i < candidateCount; i++) {
            if (candidateVote[i] > candidateVote[i - 1]) {
                winner = i;
            }
        }
        return winner;
    }

    function viewWinner() public view returns (string memory) {
        return candidateDetails[winner].name;
    }

    // get total number of voters
    function getVoterCount() public view returns (uint256) {
        return voterCount;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCandidateCount() public view returns (uint256) {
        return candidateCount;
    }
}