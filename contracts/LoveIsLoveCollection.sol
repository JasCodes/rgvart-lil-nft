// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC2981ContractWideRoyalties.sol";

/// @custom:security-contact mail@jas.bio
contract LoveIsLoveCollection is ERC721, ERC2981ContractWideRoyalties, Ownable {
    uint256 nextTokenId;

    constructor() ERC721("LoveIsLoveCollection", "LIL") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://rgvart.io/api/";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @notice Allows to set the royalties on the contract
    /// @dev This function in a real contract should be protected with a onlyOwner (or equivalent) modifier
    /// @param recipient the royalties recipient
    /// @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public {
        _setRoyalties(recipient, value);
    }

    /// @notice Mint one token to `to`
    /// @param to the recipient of the token
    function mint(address to) external {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId, "");

        nextTokenId = tokenId + 1;
    }

    /// @notice Mint several tokens at once
    /// @param recipients an array of recipients for each token
    function mintBatch(address[] memory recipients) external {
        uint256 tokenId = nextTokenId;
        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], tokenId, "");
            tokenId++;
        }

        nextTokenId = tokenId;
    }
}
