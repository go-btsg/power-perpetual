const { constants } = require('@openzeppelin/test-helpers');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const defaultProtocolParameters = {
    minPoolMarginRatio: one(),
    minInitialMarginRatio: one(1, 1),
    minMaintenanceMarginRatio: one(5, 2),
    minLiquidationReward: one(10),
    maxLiquidationReward: one(1000),
    liquidationCutRatio: one(5, 1),
    protocolFeeCollectRatio: one(2, 1),
    symbolOracleAddress: constants.ZERO_ADDRESS,
    symbolMultiplier: 1,
    symbolFeeRatio: 1,
    symbolFundingRateCoefficient: 1,
    oracleDelay: 6000,
  };

  await deploy('ProtocolParameters', {
    from: deployer,
    log: true,
    args: [...Object.values(defaultProtocolParameters)],
  });
};

function one(value = 1, left = 0, right = 18) {
  let from = ethers.BigNumber.from('1' + '0'.repeat(left));
  let to = ethers.BigNumber.from('1' + '0'.repeat(right));
  return ethers.BigNumber.from(value).mul(to).div(from);
}

module.exports.tags = ['protocol_parameters'];

