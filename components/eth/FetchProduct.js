import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import {
  Button,
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { addresses } from "./addresses";
import { ethers } from "ethers";
const abi = require("../../abi/inventoryNFT.json");

export default function FetchProduct({ numOfProducts }) {
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  // const [products, setProducts] = useState([{}]);
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inventory, setInventory] = useState([0, 0, 0, 0]);

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addresses.inventoryNft, abi, signer);

  // let _product = {
  //   brand: "",
  //   name: "",
  //   variants: "",
  //   quantity: 0,
  //   inventory: [4],
  // }

  // let products = [{}]
  // let product = []
  
  const getProduct = async () => {
    let _variant = "";
    let _quantity = 0;
    let _inventory = [];
    // const numOfProducts = await contract.productId();
    console.log(numOfProducts)
    // for (let i = 0; i < numOfProducts; i++) {
    contract
      .getProducts(numOfProducts)
      .then((data) => {
        // let _product = {};

        // _product.brand = data[0];
        // _product.name = data[1];
        setBrand(data[0]);
        setProduct(data[1]);

        for (let j = 0; j < data[2].length; j++) {
          _variant = _variant + ", " + data[2][j];
          setVariant(_variant.slice(2));
          // _product.variants = _variant.slice(2);
        }
        _variant = "";

        for (let j = 0; j < data[3].length; j++) {
          _quantity =
            parseInt(ethers.utils.formatUnits(data[3][j].toString(), "wei")) +
            _quantity;
          setQuantity(_quantity);

          // _product.quantity = _quantity;
        }
        _quantity = 0;

        for (let j = 0; j < data[4].length; j++) {
          _inventory.push(
            ethers.utils.formatUnits(data[4][j].toString(), "wei")
          );
          setInventory([..._inventory]);

          // _product.inventory = [..._inventory];
        }
        _inventory = [];
        // products.push(_product);
      })
      .catch((e) => {
        console.log(e);
      });
    // }
    // products.splice(0, 1);
    // setProducts(products);
  };

  const SetTableRow = (prop) => {
    console.log(prop)
    
    return (
      <Tr>
        <Td>{prop.brand}</Td>
        <Td>{prop.product}</Td>
        <Td>{prop.variants}</Td>
        <Td>{prop.quantity}</Td>
        <Td>{prop.available}</Td>
        <Td>{prop.reserved}</Td>
        <Td>{prop.sold}</Td>
        <Td>{prop.shipped}</Td>
      </Tr>
    );
  };

  useEffect(() => {
    // if (web3 === null) {
    //   value.toast("Please connect your wallet.");
    // } else {
    // }
    getProduct();
  }, []);

  return (
    <>
      <SetTableRow
        brand={brand}
        product={product}
        variants={variant}
        quantity={quantity}
        available={inventory[0]}
        reserved={inventory[1]}
        sold={inventory[2]}
        shipped={inventory[3]}
      ></SetTableRow>
    </>
  );
}
