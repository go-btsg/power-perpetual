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

async function addSymbol() {
  // We get the contract to deploy
    [deployer] = await ethers.getSigners();


    let usdt_address = "0x580d6ebC53BB4239f52C5E28a9c2bD037faB0089";
    let ltoken_address = "0x5c4Da48CEb00BF3b54d72907bfEAd1F37eB46738";
    let ptoken_address = "0x57E7E2572690694CE9Ee30ea014Eb76E9942Ecac";
    let protocol_params_address = "0x95772C8fa274ECE7290b8603B5A6B50597eAd48e"

    let perpetual_address = "0xA275205637647089f48AFbdA1440A41fB2f985A6";
    let pool_info = "0x84501714E758D1D896A35F184Fb5FA6De7E29d99";
    let offchainOracle_address = "0x570f640E03B03581909182186563472Aceb8f918";

    pool = await (await ethers.getContractAt('PerpetualPoolLite', perpetual_address) )
    s = await( await pool.addSymbol(
        0, 
        'TEST0'
      ));

    console.log(s)
}


addSymbol()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
