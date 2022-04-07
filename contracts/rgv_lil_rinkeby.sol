// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./rgv_erc721.sol";

contract RGVLILRinkeby is RGVERC721 {
    constructor()
        RGVERC721(
            "RGVart - Love is Love NFT Collection",
            "LIL",
            "",
            "ipfs://bafkreibif7kntrgvu36pvqnrkd6rwrel3uxwewufwc5iyjbd42pzughaoi",
            0.01 ether,
            170,
            10
        )
    {}
}
