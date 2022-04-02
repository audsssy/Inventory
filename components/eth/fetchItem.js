import { addresses } from "./addresses";
import { ethers } from "ethers";
const abi = require("../../abi/inventory.json");

export async function fetchItem(tokenId) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addresses.inventory, abi, signer);

  const _item = {}
  contract
    .items(tokenId)
    .then((data) => {
      _item.productId = parseInt(ethers.utils.formatUnits(data[0].toString(), "wei"));
      _item.tokenId = tokenId;
      _item.owner = data[1]
      _item.price = ethers.utils.formatUnits(data[2].toString(), "ether");
      _item.location = data[3]
      _item.isChipped = data[4]
      _item.isDigitized = data[5]
      _item.canAuction = data[6]
      
      _item.hasBid = data[7]
      _item.isSold = data[8]

      _item.isShipped = data[9]
    })
    .catch((e) => {
      console.log(e);
    });

  contract
    .getItemVariants(tokenId)
    .then((data) => {
      _item.variants = data
    })
    .catch((e) => {
      console.log(e);
    });

    (!_item.hasBid) ? _item.auctionStatus = "Auction in Progress" : _item.auctionStatus = "Bidded"
    (_item.hasBid && _item.isSold) ? _item.auctionStatus = "Auction ended" : _item.auctionStatus = "Auction in Progress"
    (_item.hasBid && !_item.isSold) ? _item.auctionStatus = "Auction in Progress" : _item.auctionStatus = "Auction in Progress"

    // console.log(_item)
  return _item;
};
