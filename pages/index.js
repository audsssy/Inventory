import React, { useState, useContext, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import InventoryView from "../components/InventoryView";
import TokenActivity from "../components/TokenActivity";

export default function Home() {

  return (
    <>
      <Text color="white" fontSize="2xl" >Drop List</Text>
      <Box h="10px" />
      <InventoryView />
      <br />
      <Text color="white" fontSize="2xl">Activity</Text>
      <Box h="10px" />
      <TokenActivity />
    </>
  );
}