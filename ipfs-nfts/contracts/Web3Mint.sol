// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Web3Mint is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721 ("OjisanNFT", "OJI"){
        console.log("This is my NFT contract.");
    }

    function makeAnEpicNFT() public {
        // 現在のtokenIdを取得します。tokenIdは0からはじまる
        uint256 newItemId = _tokenIds.current();
        // msg.sender を使い、NFTを送信者にMintします
        _safeMint(msg.sender, newItemId);
        // NFT データを設定
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/5DN1");

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        // カウンターをインクリメント
        _tokenIds.increment();
    }

}