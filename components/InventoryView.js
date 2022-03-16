import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { addresses } from "./eth/addresses";
import { ethers } from "ethers";
const abi = require("../abi/inventoryNFT.json");
import { fetchProduct } from "./eth/fetchProduct";

export default function InventoryView() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [rows, setRows] = useState([]);

  const getProductCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addresses.inventoryNft, abi, signer);
    const productId = await contract.productId();
    productId = parseInt(ethers.utils.formatUnits(productId, "wei"));
    setNumOfProducts(productId);
  };

  const getRows = async () => {
    var _rows = [];

    for (var i = 0; i < numOfProducts; i++) {
      const row = await fetchProduct(i);
      _rows.push(row);
    }
    setRows([..._rows]);
  };

  useEffect(() => {
    if (web3 === null) {
      value.toast("Please connect your wallet.");
    } else {
      getProductCount();
    }

    if (numOfProducts) {
      getRows();
    }
  }, [numOfProducts]);

  return (
    <Box bg="blue" color="white">
      <Table variant="unstyled">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr bg="gray.400" color={"black"}>
            <Th>#</Th>
            <Th>Brand</Th>
            <Th>Product</Th>
            <Th>Variants</Th>
            <Th>Total Count</Th>
            <Th>Available</Th>
            <Th>Reserved</Th>
            <Th>Sold</Th>
            <Th>Shipped</Th>
          </Tr>
        </Thead>
        <Tbody>
          {console.log(rows)}
          {(rows.map(({id, brand, name, variants, quantity, available, reserved, sold, shipped}) => (
            <Tr bg={"yellow.300"} color="black">
              <Td>{id}</Td>
              <Td >{brand}</Td>
              <Td>{name}</Td>
              <Td>{variants}</Td>
              <Td>{quantity}</Td>
              <Td>{available}</Td>
              <Td>{reserved}</Td>
              <Td>{sold}</Td>
              <Td>{shipped}</Td>
            </Tr>
          )))}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </Box>
  );
}
