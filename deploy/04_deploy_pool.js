const { constants } = require('@openzeppelin/test-helpers');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const lToken = await ethers.getContract('LTokenLite');
  const pToken = await ethers.getContract('PTokenLite');
  //const usdt = await ethers.getContract('TestTetherToken');
  const protocolParameters = await ethers.getContract('ProtocolParameters');

  const pool = await deploy('PerpetualPoolLite', {
    from: deployer,
    log: true,
    args: [
      [
        "0x580d6ebC53BB4239f52C5E28a9c2bD037faB0089", // bTokenAddress
        lToken.address, // lTokenAddress
        pToken.address, // pTokenAddress
        constants.ZERO_ADDRESS, // liquidatorQualifierAddress
        deployer, // protocolFeeCollector
        "0x580d6ebC53BB4239f52C5E28a9c2bD037faB0089",
        protocolParameters.address,
      ]
    ],
  });

  if (pool.newlyDeployed) {
    log('Initializing lToken...');
    await lToken.setPool(pool.address);
    log('Initializing pToken...');
    await pToken.setPool(pool.address);
  }
};

module.exports.tags = ['pool'];
module.exports.dependencies = ['ltoken', 'ptoken', 'protocol_parameters'];
