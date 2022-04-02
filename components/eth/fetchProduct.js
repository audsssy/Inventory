import { addresses } from "./addresses";
import { ethers } from "ethers";
const abi = require("../../abi/inventory.json");

export async function fetchProduct(productId) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addresses.inventory, abi, signer);

  const _product = {}
  let _variant = "";
  let _quantity = 0;
  contract
    .getProducts(productId)
    .then((data) => {
      _product.brand = data[0]
      _product.name = data[1]

      for (let j = 0; j < data[2].length; j++) {
        _variant = _variant + ", " + data[2][j];
        _product.variants = _variant.slice(2)
      }
      _variant = "";

      for (let j = 0; j < data[3].length; j++) {
        _quantity =
          parseInt(ethers.utils.formatUnits(data[3][j].toString(), "wei")) +
          _quantity;
        _product.quantity = _quantity
      }
      _quantity = 0;

      _product.available = ethers.utils.formatUnits(data[4][0].toString(), "wei")
      _product.reserved = ethers.utils.formatUnits(data[4][1].toString(), "wei")
      _product.sold = ethers.utils.formatUnits(data[4][2].toString(), "wei")
      _product.shipped = ethers.utils.formatUnits(data[4][3].toString(), "wei")

      _product.id = productId
      // console.log(_product)
    })
    .catch((e) => {
      console.log(e);
    });
  return _product;
};
