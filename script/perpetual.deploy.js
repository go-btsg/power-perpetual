/**
 * @dev script to deploy the EverlastingOption contract and dependencies
 *
 * after deployment addresses of contracts are saved in the everlasting-option.deploy.log
 * file under the logs folder for later consulting
 */
const fs = require('fs');
const BigNumber = require('bignumber.js');

// const file = fs.createWriteStream('./logs/everlasting-option.deploy.log', { flags: 'w' });
// let logger = new console.Console(file, file);

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
// rescale
function one(value = 1, left = 0, right = 18) {
  let from = ethers.BigNumber.from('1' + '0'.repeat(left));
  let to = ethers.BigNumber.from('1' + '0'.repeat(right));
  return ethers.BigNumber.from(value).mul(to).div(from);
}

function neg(value) {
  return value.mul(-1);
}

async function main() {
  // const config = getConfigFromNetwork(hre.network.name);

  // ! change the signatory before deploying to production
  [deployer] = await ethers.getSigners();
  // signature = deployer
  console.log('Deployer address: ', deployer.address);
  // console.log('Signatory address: ', signatory.address, '\n');

  // deploy test usdt
  // console.log('Deploying usdt...');
  // let TestTetherToken = await ethers.getContractFactory('TestTetherToken');
  // let usdt = await TestTetherToken.deploy('Tether USDT', 'USDT');
  // await usdt.deployed();
  // console.log(`Test USDT: ${usdt.address}`);

  // deploy liquidity token
  // console.log('Deploying lToken...');
  // let LTokenOption = await ethers.getContractFactory('LTokenLite');
  // let lToken = await LTokenOption.deploy('Exchange Liquidity Token', 'pLT');
  // await lToken.deployed();
  // console.log(`lToken: ${lToken.address}`);

  // // deploy position token
  // console.log('Deploying pToken...');
  // let PTokenOption = await ethers.getContractFactory('PTokenLite');
  // let pToken = await PTokenOption.deploy('Exchange Position Token', 'pPT');
  // await pToken.deployed();
  // console.log(`pToken: ${pToken.address}`);

   // deploy offchain oracle
   console.log('Deploying offchain oracle...');
   let OffchainOracle = await ethers.getContractFactory('SymbolOracleOffChain');
   let offchainOracle = await OffchainOracle.deploy('TEST', deployer.address);
   await offchainOracle.deployed();
   console.log(`Offchain Oracle: ${offchainOracle.address}`);
 

  // let usdt_address = '0x2e016eE15Ca987085D4Ac3661D2148755612c93f';
  // // deploy everlasting option contract
  // console.log('Deploying pool...');
  // let pool = await (
  //   await ethers.getContractFactory('PerpetualPoolLite')
  // ).deploy(
  //   [
  //     one(), // minPoolMarginRatio
  //     one(1, 1), // minInitialMarginRatio
  //     one(5, 2), // minMaintenanceMarginRatio
  //     one(10), // minLiquidationReward
  //     one(1000), // maxLiquidationReward
  //     one(5, 1), // liquidationCutRatio
  //     one(2, 1), // protocolFeeCollectRatio
  //   ],
  //   [
  //     "0x580d6ebC53BB4239f52C5E28a9c2bD037faB0089", // bTokenAddress
  //     lToken.address, // lTokenAddress
  //     pToken.address, // pTokenAddress
  //     ZERO_ADDRESS, // liquidatorQualifierAddress
  //     deployer.address, // protocolFeeCollector
  //   ]
  // );

  await pool.deployed();
  console.log(`pool: ${pool.address}`);

  console.log('Deploying Pool Info..');
  let PoolInfo = await ethers.getContractFactory('PoolInfo');
  let poolInfo = await PoolInfo.deploy(pool.address);
  await poolInfo.deployed();
  console.log(`Pool info: ${poolInfo.address}`);

  // initialize volatility oracle offchain
  console.log('Initializing lToken...');
  await lToken.setPool(pool.address);
  console.log('Initializing lToken...');
  await pToken.setPool(pool.address);

  // log the addresses to file
  console.log('Logging to file...');

  logger.log(`Deployer account: ${deployer}\n`);
  logger.log(`Test USDT: ${usdt.address}`);
  logger.log(`lToken: ${lToken.address}`);
  logger.log(`pToken: ${pToken.address}`);
  logger.log(`pmmPricing: ${pricing.address}`);
  logger.log(`everlastingOptionPricing: ${everlastingOptionPricing.address}`);
  logger.log(`volatilityChainlinkOracle: ${volatilityChainlinkOracle.address}`);
  logger.log(`volatilityOracleOffChain: ${volatilityOracleOffChain.address}`);
  logger.log(`pool: ${pool.address}`);
}

function getConfigFromNetwork(network) {
  switch (network) {
    case 'rinkeby':
      return {
        volatilityChainlinkOracle: {
          linkToken: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
          chainlinkNode: '0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e',
          jobId: '6d1bfe27e7034b1d87b5270556b17277',
          nodeFee: 100,
        },
      };
    default:
      throw new Error('Trying to deploy to an unconfigured network');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
