// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC2981/ERC2981ContractWideRoyalties.sol";
import "hardhat/console.sol";

/// @custom:security-contact mail@jas.bio
contract LoveIsLoveCollection is
    ERC721Enumerable,
    ERC2981ContractWideRoyalties,
    Ownable
{
    using Strings for uint256;

    string baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.09 ether;
    uint256 public maxSupply = 170;
    bool public paused = false;
    bool public revealed = false;
    string public notRevealedUri;

    // constructor(
    //     string memory _name,
    //     string memory _symbol,
    //     string memory _initBaseURI,
    //     string memory _initNotRevealedUri
    // ) ERC721(_name, _symbol) {
    //     setBaseURI(_initBaseURI);
    //     setNotRevealedURI(_initNotRevealedUri);
    // }

    constructor() ERC721("LoveIsLoveCollection", "LIL") {
        setRoyalties(msg.sender, 500);
        setBaseURI("https://loveislove.com/");
        setNotRevealedURI("https://loveislove.com/");
        mint(10);
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // public
    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused, "Minting is paused");
        require(_mintAmount > 0, "Mint amount must be greater than 0");
        require(
            supply + _mintAmount <= maxSupply,
            "Mint amount exceeds max supply"
        );

        if (msg.sender != owner()) {
            require(
                msg.value >= cost * _mintAmount,
                "Mint amount less than cost"
            );
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //only owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    /// @notice Allows to set the royalties on the contract
    /// @dev This function in a real contract should be protected with a onlyOwner (or equivalent) modifier
    /// @param recipient the royalties recipient
    /// @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        _setRoyalties(recipient, value);
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    // uint256 nextTokenId = 0;
    // uint256 public maxSupply = 170;
    // uint256 public cost = 0.09 ether;
    // bool public releaved = false;

    // string public notRel

    // string baseURI;

    // constructor() ERC721("LoveIsLoveCollection", "LIL") {
    //     setRoyalties(msg.sender, 500);
    //     // baseURI = "https://www.loveislove.collection/";
    //     mint(10);
    // }

    // function updateBaseURI(string memory _baseURI) public {
    //     baseURI = _baseURI;
    // }

    // function _baseURI() internal pure override returns (string memory) {
    //     return "https://rgvart.io/api/";
    // }

    /**
     * @dev Returns an URI for a given token ID
     */
    // function tokenURI(uint256 _tokenId) public view returns (string memory) {
    //     return Strings.strConcat(_baseURI(), Strings.uint2(_tokenId));
    // }

    // function updateMaxSupply(uint256 num) public onlyOwner {
    //     maxSupply = num;
    // }

    // function safeMint(address to, uint256 tokenId) public onlyOwner {
    //     _safeMint(to, tokenId);
    // }

    /// @notice Mint multiple tokens for sender
    /// @param num number of tokens to mint
    // function mint(uint256 num) public {
    //     require(
    //         num > 0,
    //         "LoveIsLoveCollection: Minting 0 tokens is not allowed."
    //     );
    //     require(
    //         num <= maxSupply - nextTokenId,
    //         "LoveIsLoveCollection: Minting more than the max supply is not allowed."
    //     );
    //     for (uint8 i = 0; i < num; i++) {
    //         // console.log(nextTokenId + i);
    //         _safeMint(msg.sender, nextTokenId + i, "");
    //     }
    //     nextTokenId += num;
    // }

    // /// @notice Mint several tokens at once
    // /// @param recipients an array of recipients for each token
    // function mintBatch(address[] memory recipients) external {
    //     uint256 tokenId = nextTokenId;
    //     for (uint256 i; i < recipients.length; i++) {
    //         _safeMint(recipients[i], tokenId, "");
    //         tokenId++;
    //     }

    //     nextTokenId = tokenId;
    // }
}
