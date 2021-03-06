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




let usdt_address = "0x580d6ebC53BB4239f52C5E28a9c2bD037faB0089";
let ltoken_address = "0x5c4Da48CEb00BF3b54d72907bfEAd1F37eB46738";
let ptoken_address = "0x57E7E2572690694CE9Ee30ea014Eb76E9942Ecac";
let protocol_params_address = "0x95772C8fa274ECE7290b8603B5A6B50597eAd48e"

let perpetual_address = "0xA275205637647089f48AFbdA1440A41fB2f985A6";
let pool_info = "0x84501714E758D1D896A35F184Fb5FA6De7E29d99";
let offchainOracle_address = "0x570f640E03B03581909182186563472Aceb8f918";

async function main() {
  //const config = getConfigFromNetwork(hre.network.name);

  // ! change the signatory before deploying to production
  [deployer] = await ethers.getSigners();
  console.log('Deployer address: ', deployer.address);

  const defaultProtocolParameters = {
    minPoolMarginRatio: one(),
    minInitialMarginRatio: one(1, 1),
    minMaintenanceMarginRatio: one(5, 2),
    minLiquidationReward: one(10),
    maxLiquidationReward: one(1000),
    liquidationCutRatio: one(5, 1),
    protocolFeeCollectRatio: one(2, 1),
    symbolOracleAddress: offchainOracle_address,
    symbolMultiplier: 1,
    symbolFeeRatio: 1,
    symbolFundingRateCoefficient: 1,
  };

  // // verify test usdt
  // console.log('Verifying usdt...');
  // await hre.run("verify:verify", {
  //       address: usdt_address,
  //       constructorArguments: ['Tether USDT', 'USDT']
  // });
  // console.log(`Verified USDT: ${usdt_address}`);

  // verify liquidity token
  console.log('Verifying lToken...');
  await hre.run("verify:verify", {
        address: ltoken_address,
        contract: "contracts/token/LTokenLite.sol:LTokenLite",
        constructorArguments: ['Exchange Liquidity Token', 'pLT']
  });
  console.log(`Verified lToken: ${ltoken_address}`);

  // verify position token
  console.log('Verifying pToken...');
  await hre.run("verify:verify", {
        address: ptoken_address,
        constructorArguments: ['Exchange Position Token', 'pPT']
  });
  console.log(`Verified pToken: ${ptoken_address}`);


  // verify protocol params 
  console.log('Verifying protocol params...');
  await hre.run("verify:verify", {
        address: protocol_params_address,
        constructorArguments: [...Object.values(defaultProtocolParameters)]
  });
  console.log(`Verified protocol params.: ${protocol_params_address}`);


   // verify perpetual pool
   console.log('Verifying perpetual pool...');
   await hre.run("verify:verify", {
         address: perpetual_address,
         constructorArguments: [
            [
              usdt_address, // bTokenAddress
              ltoken_address, // lTokenAddress
              ptoken_address, // pTokenAddress
              ZERO_ADDRESS, // liquidatorQualifierAddress
              deployer.address, // protocolFeeCollector
            ],
            protocol_params_address,
          ]
   });
   console.log(`Verified perpetual pool: ${perpetual_address}`);

   // verify pool info
   console.log('Verifying pool info...');
   await hre.run("verify:verify", {
         address: pool_info,
         constructorArguments: [ perpetual_address ]
   });
   console.log(`Verified pool info: ${pool_info}`);

  // verify offchain oracle
   console.log('Verifying offchain oracle...');
   await hre.run("verify:verify", {
         address: offchainOracle_address,
         constructorArguments: [ deployer.address, 60000 ]
   });
   console.log(`Verified offchain oracle: ${offchainOracle_address}`);
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
