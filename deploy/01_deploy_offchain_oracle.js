module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const protocolParameters = await ethers.getContract('ProtocolParameters');

  const oracle = await deploy('SymbolOracleOffChain', {
    from: deployer,
    log: true,
    args: [deployer, protocolParameters.address],
  });

  if (oracle.newlyDeployed) {
      console.log('Initializing oracle as parameter...');
      protocolParameters.setOracleDelay(oracle.address)
  };

};

module.exports.tags = ['oracle'];
module.exports.dependencies = ['protocol_parameters'];

