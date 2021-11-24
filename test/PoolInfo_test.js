const { assert } = require('chai');

describe('PoolInfo', async function () {
  beforeEach(async () => {
    await deployments.fixture(['poolInfo']);
    pool = await ethers.getContract('PoolInfo');
  });

  it('should have initial balance in deployer', async () => {
    let parameters = await pool.getProtocolParameters();

    assert.strictEqual(parameters.minPoolMarginRatio, one(), 'Invalid min pool margin ratio');
    assert.strictEqual(parameters.minInitialMarginRatio, one(1, 1), 'Invalid min initial margin ratio');
    assert.strictEqual(parameters.minMaintenanceMarginRatio, one(5, 2), 'Invalid min maintenance margin ratio');
    assert.strictEqual(parameters.minLiquidationReward, one(10), 'Invalid min liquidation reward');
    assert.strictEqual(parameters.maxLiquidationReward, one(1000), 'Invalid max liquidation reward');
    assert.strictEqual(parameters.liquidationCutRatio, one(5, 1), 'Invalid liquidation cut ratio');
    assert.strictEqual(parameters.protocolFeeCollectRatio, one(2, 1), 'Invalid protocol fee collect ratio');
  });
});

function one(value = 1, left = 0, right = 18) {
  let from = ethers.BigNumber.from('1' + '0'.repeat(left));
  let to = ethers.BigNumber.from('1' + '0'.repeat(right));
  return ethers.BigNumber.from(value).mul(to).div(from);
}
