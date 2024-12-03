// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EthereusToken is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    // Asset type mapping
    mapping(uint256 => string) private _assetTypes;
    
    // Asset jurisdiction mapping
    mapping(uint256 => string) private _jurisdictions;
    
    // Asset value mapping (in wei)
    mapping(uint256 => uint256) private _assetValues;

    event AssetMinted(uint256 tokenId, address owner, string assetType, string jurisdiction, uint256 value);
    event AssetValueUpdated(uint256 tokenId, uint256 newValue);

    constructor() ERC721("EthereusToken", "ETH") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mintAsset(
        address to,
        string memory uri,
        string memory assetType,
        string memory jurisdiction,
        uint256 value
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _assetTypes[tokenId] = assetType;
        _jurisdictions[tokenId] = jurisdiction;
        _assetValues[tokenId] = value;

        emit AssetMinted(tokenId, to, assetType, jurisdiction, value);
        return tokenId;
    }

    function updateAssetValue(uint256 tokenId, uint256 newValue) public onlyRole(MINTER_ROLE) {
        require(_exists(tokenId), "Asset does not exist");
        _assetValues[tokenId] = newValue;
        emit AssetValueUpdated(tokenId, newValue);
    }

    function getAssetDetails(uint256 tokenId) public view returns (
        string memory assetType,
        string memory jurisdiction,
        uint256 value,
        string memory uri
    ) {
        require(_exists(tokenId), "Asset does not exist");
        return (
            _assetTypes[tokenId],
            _jurisdictions[tokenId],
            _assetValues[tokenId],
            tokenURI(tokenId)
        );
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}