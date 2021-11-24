// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract NaiveOracle {
    uint256 public price;

    function setPrice(uint256 newPrice) public {
        price = newPrice;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }
}
