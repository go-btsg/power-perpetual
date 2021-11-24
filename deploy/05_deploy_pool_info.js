module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const pool = await ethers.getContract('PerpetualPoolLite');

  await deploy('PoolInfo', {
    from: deployer,
    log: true,
    args: [pool.address],
  });
};

module.exports.tags = ['poolInfo'];
module.exports.dependencies = ['pool'];
