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
const abi = require("../abi/inventory.json");
import { fetchProduct } from "./eth/fetchProduct";

export default function InventoryView({ loadData }) {
  const value = useContext(AppContext);
  const { products } = value.state;

  useEffect(() => {
    
  }, [loadData]);

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
          {loadData && (products.map(({id, brand, name, variants, quantity, available, reserved, sold, shipped}) => (
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
      </Table>
    </Box>
  );
}
