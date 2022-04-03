const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_keys = [
  "40aa746afad81bfbf7dab5095011f89735ab6e51386914298f27b4a41443535d",
  "a70b19dc78b1e44be07c317ee15f966eac82c77ac9db02db4109c02b40d27e3f",
];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      network_id: "*",
      port: 8545,
    },
    Kovan: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: private_keys,
          providerOrUrl:
            "wss://kovan.infura.io/ws/v3/686061bed3ac4c8785426e9332e78166",
          numberOfAddresses: 2,
        }),

      network_id: 42,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",
    },
  },
};
