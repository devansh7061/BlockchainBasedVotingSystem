const path = require("path");
// const HDWalletProvider = require("@truffle/hdwallet-provider")

// const private_keys = [
//   'f016efba819436cd9ff71bd85b9867c9059d0e69d2c5a3f34655848c9dede29d',
//   '706d748119d21959f00a15146f5471f2a506622a37ab841bbf280892c081be33'
// ]

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      network_id: "*",
      port: 8545
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: "https://rinkeby.infura.io/v3/ab5f76e93a6244cdb521b93e52f6288c",
        numberOfAddresses: 2
      }),
        
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};