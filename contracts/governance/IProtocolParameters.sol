// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IProtocolParameters {
    function minPoolMarginRatio() external view returns (int256);

    function minInitialMarginRatio() external view returns (int256);

    function minMaintenanceMarginRatio() external view returns (int256);

    function minLiquidationReward() external view returns (int256);

    function maxLiquidationReward() external view returns (int256);

    function liquidationCutRatio() external view returns (int256);

    function protocolFeeCollectRatio() external view returns (int256);

    function symbolOracleAddress() external view returns (address);

    function symbolMultiplier() external view returns (int256);

    function symbolFeeRatio() external view returns (int256);

    function symbolFundingRateCoefficient() external view returns (int256);

    function oracleDelay() external view returns (uint256);
}
