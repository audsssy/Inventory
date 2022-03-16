const abi = require("../../abi/inventory.json")

export default function inventory(address, web3) {
  let inventory = new web3.eth.Contract(abi, address);
  return inventory;
}