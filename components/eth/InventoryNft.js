const abi = require("../../abi/inventoryNFT.json")

export default function inventoryNFT(address, web3) {
  let inventoryNFT = new web3.eth.Contract(abi, address);
  return inventoryNFT;
}