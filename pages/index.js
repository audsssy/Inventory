import React, { useState, useContext, useEffect } from "react";
import AppContext from "../components/AppContext";
import { Text, Box } from "@chakra-ui/react";
import InventoryView from "../components/InventoryView";
import TokenActivity from "../components/TokenActivity";

export default function Home() {
  const value = useContext(AppContext);
  const { products, items } = value.state;
  const [loadData, setLoadData] = useState(false)

  useEffect(() => {
    if (products && items) {
      // console.log(loadData, products, items)
      setLoadData(true)
    }
  }, [products, items])

  return (
    <>
      <Text color="white" fontSize="2xl" >Drop List</Text>
      <Box h="10px" />
      <InventoryView loadData={loadData}/>
      <br />
      <Text color="white" fontSize="2xl">Activity</Text>
      <Box h="10px" />
      <TokenActivity loadData={loadData}/>
    </>
  );
}