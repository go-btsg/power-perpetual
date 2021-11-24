// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProtocolParameters is Ownable {
    int256 public minPoolMarginRatio;
    int256 public minInitialMarginRatio;
    int256 public minMaintenanceMarginRatio;
    int256 public minLiquidationReward;
    int256 public maxLiquidationReward;
    int256 public liquidationCutRatio;
    int256 public protocolFeeCollectRatio;
    address public symbolOracleAddress;
    int256 public symbolMultiplier;
    int256 public symbolFeeRatio;
    int256 public symbolFundingRateCoefficient;
    uint256 public oracleDelay;

    /**
     * @dev set initial state of the data
     */
    constructor(
        int256 _minPoolMarginRatio,
        int256 _minInitialMarginRatio,
        int256 _minMaintenanceMarginRatio,
        int256 _minLiquidationReward,
        int256 _maxLiquidationReward,
        int256 _liquidationCutRatio,
        int256 _protocolFeeCollectRatio,
        address _symbolOracleAddress,
        int256 _symbolMultiplier,
        int256 _symbolFeeRatio,
        int256 _symbolFundingRateCoefficient,
        uint256 _oracleDelay
    ) {
        minPoolMarginRatio = _minPoolMarginRatio;
        minInitialMarginRatio = _minInitialMarginRatio;
        minMaintenanceMarginRatio = _minMaintenanceMarginRatio;
        minLiquidationReward = _minLiquidationReward;
        maxLiquidationReward = _maxLiquidationReward;
        liquidationCutRatio = _liquidationCutRatio;
        protocolFeeCollectRatio = _protocolFeeCollectRatio;
        symbolOracleAddress = _symbolOracleAddress;
        symbolMultiplier = _symbolMultiplier;
        symbolFeeRatio = _symbolFeeRatio;
        symbolFundingRateCoefficient = _symbolFundingRateCoefficient;
        oracleDelay = _oracleDelay;
    }

    function setMinPoolMarginRatio(int256 _minPoolMarginRatio) external onlyOwner {
        minPoolMarginRatio = _minPoolMarginRatio;
    }

    function setMinInitialMarginRatio(int256 _minInitialMarginRatio) external onlyOwner {
        minInitialMarginRatio = _minInitialMarginRatio;
    }

    function setMinMaintenanceMarginRatio(int256 _minMaintenanceMarginRatio) external onlyOwner {
        minMaintenanceMarginRatio = _minMaintenanceMarginRatio;
    }

    function setMinLiquidationReward(int256 _minLiquidationReward) external onlyOwner {
        minLiquidationReward = _minLiquidationReward;
    }

    function setMaxLiquidationReward(int256 _maxLiquidationReward) external onlyOwner {
        maxLiquidationReward = _maxLiquidationReward;
    }

    function setLiquidationCutRatio(int256 _liquidationCutRatio) external onlyOwner {
        liquidationCutRatio = _liquidationCutRatio;
    }

    function setProtocolFeeCollectRatio(int256 _protocolFeeCollectRatio) external onlyOwner {
        protocolFeeCollectRatio = _protocolFeeCollectRatio;
    }

    function setSymbolOracleAddress(address _symbolOracleAddress) external onlyOwner {
        symbolOracleAddress = _symbolOracleAddress;
    }

    function setSymbolMultiplier(int256 _symbolMultiplier) external onlyOwner {
        symbolMultiplier = _symbolMultiplier;
    }

    function setSymbolFeeRatio(int256 _symbolFeeRatio) external onlyOwner {
        symbolFeeRatio = _symbolFeeRatio;
    }

    function setSymbolFundingRateCoefficient(int256 _symbolFundingRateCoefficient) external onlyOwner {
        symbolFundingRateCoefficient = _symbolFundingRateCoefficient;
    }

    function setOracleDelay(uint256 _oracleDelay) external onlyOwner {
       oracleDelay = _oracleDelay;
    }
}
