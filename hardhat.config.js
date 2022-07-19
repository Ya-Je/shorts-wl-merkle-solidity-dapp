require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337, // Chain ID should match the hardhat network's chainid
      // loggingEnabled: true,
    }
  }
};
