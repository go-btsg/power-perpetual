// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "../interface/IPTokenLite.sol";
import "./ERC721.sol";

contract PTokenLite is IPTokenLite, ERC721 {
    // PToken name
    string _name;
    // PToken symbol
    string _symbol;
    // associative pool address
    address _pool;
    // total number of PToken ever minted, this number will never decease
    uint256 _totalMinted;
    // total PTokens hold by all traders
    uint256 _totalSupply;

    // tokenId => margin
    mapping(uint256 => int256) _tokenIdMargin;
    // tokenId => (symbolId => Position)
    mapping(uint256 => Position) _tokenIdPosition;

    // symbolId => number of position holders
    uint256 _numPositionHolders;

    modifier _pool_() {
        require(msg.sender == _pool, "PToken: only pool");
        _;
    }

    constructor(string memory name_, 
                string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function setPool(address newPool) public override {
        require(_pool == address(0) || _pool == msg.sender, 'LToken.setPool: not allowed');
        _pool = newPool;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function pool() public view override returns (address) {
        return _pool;
    }

    function totalMinted() public view override returns (uint256) {
        return _totalMinted;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function getNumPositionHolders() public view override returns (uint256) {
        return _numPositionHolders;
    }

    function exists(address owner) public view override returns (bool) {
        return _exists(owner);
    }

    function getMargin(address owner) public view override returns (int256) {
        return _tokenIdMargin[_ownerTokenId[owner]];
    }

    function updateMargin(address owner, int256 margin) public override _pool_ {
        _tokenIdMargin[_ownerTokenId[owner]] = margin;
        emit UpdateMargin(owner, margin);
    }

    function addMargin(address owner, int256 delta) public override _pool_ {
        int256 margin = _tokenIdMargin[_ownerTokenId[owner]] + delta;
        _tokenIdMargin[_ownerTokenId[owner]] = margin;
        emit UpdateMargin(owner, margin);
    }

    function getPosition(address owner) public view override returns (Position memory) {
        return _tokenIdPosition[_ownerTokenId[owner]];
    }

    function updatePosition(
        address owner,
        Position memory position
    ) public override _pool_ {
        int256 preVolume = _tokenIdPosition[_ownerTokenId[owner]].volume;
        int256 curVolume = position.volume;

        if (preVolume == 0 && curVolume != 0) {
            _numPositionHolders++;
        } else if (preVolume != 0 && curVolume == 0) {
            _numPositionHolders--;
        }

        _tokenIdPosition[_ownerTokenId[owner]] = position;
        emit UpdatePosition(
            owner,
            position.volume,
            position.cost,
            position.lastCumulativeFundingRate
        );
    }

    function mint(address owner) public override _pool_ {
        _totalSupply++;
        uint256 tokenId = ++_totalMinted;
        require(!_exists(tokenId), "PToken.mint: existent tokenId");

        _ownerTokenId[owner] = tokenId;
        _tokenIdOwner[tokenId] = owner;

        emit Transfer(address(0), owner, tokenId);
    }

    function burn(address owner) public override _pool_ {
        uint256 tokenId = _ownerTokenId[owner];

        _totalSupply--;
        delete _ownerTokenId[owner];
        delete _tokenIdOwner[tokenId];
        delete _tokenIdOperator[tokenId];
        delete _tokenIdMargin[tokenId];

        if (_tokenIdPosition[tokenId].volume != 0) {
            _numPositionHolders--;
        }
        delete _tokenIdPosition[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
}
