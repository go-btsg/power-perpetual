const { assert } = require('chai');

describe('PerpetualPoolLite', async function () {
  beforeEach(async () => {
    await deployments.fixture(['mocks']);
    usdt = await ethers.getContract('TestTetherToken');
  });

  it('should assert true', async () => {
    assert.isTrue(true);
  });

  it('should have initial balance in deployer', async () => {
    const { deployer } = await getNamedAccounts();

    const expected = 10 ** 8;
    let balance = await usdt.balanceOf(deployer);

    assert.strictEqual(balance.toNumber(), expected, 'Invalid balance');
  });
});
