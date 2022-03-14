import React, { useState, useContext} from "react"
import AppContext from "./AppContext";
import {
  Button,
  Icon,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react"
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai"
import { getNetworkName } from "../utils/formatters";
import CreateProduct from "./controls/CreateProduct"
import UpdateProduct from "./controls/UpdateProduct";
import CreateItem from "./controls/CreateItem";
import UpdateItem from "./controls/UpdateItem";

export default function AdminControls() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [network, setNetwork] = useState(4)
  const [p, setP] = useState(false)
  const [up, setUp] = useState(false)
  const [i, setI] = useState(false)
  const [ui, setUi] = useState(false)
  const [ra, setRa] = useState(false)
  const [bs, setBs] = useState(false)
  const [sale, setSale] = useState(false)
  const [shipping, setShipping] = useState(false)
  const [ds, setDs] = useState(false)

  const toggleP = () => {
    setP(() => !p)
    setUp(false)
    setI(false)
    setUi(false)
    setRa(false)
    setBs(false)
    setSale(false)
    setShipping(false)
    setDs(false)
  }

  const toggleUp = () => {
    setP(false)
    setUp(() => !up)
    setI(false)
    setUi(false)
    setRa(false)
    setBs(false)
    setSale(false)
    setShipping(false)
    setDs(false)
  }

  const toggleI = () => {
    setP(false)
    setUp(false)
    setI(() => !i)
    setUi(false)
    setRa(false)
    setBs(false)
    setSale(false)
    setShipping(false)
    setDs(false)
  }

  const toggleUi = () => {
    setP(false)
    setUp(false)
    setI(false)
    setUi(() => !ui)
    setRa(false)
    setBs(false)
    setSale(false)
    setShipping(false)
    setDs(false)
  }

  const handleChange = async (e) => {
    let id = e.target.value
    setNetwork(id)
    if (chainId != id) {
      await value.switchChain(id)
    }
  }

  const handleConnect = async () => {
    await value.connect()
    if (chainId != network) {
      await value.switchChain(network)
    }
  }

  return (
    <>
    <VStack>
    {(chainId != network || account == null) ? (
          <>
            <HStack id="not-connected">
              <Icon color="white" as={AiOutlineWarning}></Icon>
              <Text color="white">
                Please connect your wallet to Rinkeby
              </Text>
            <Button h="30px" bg="yellow.400" onClick={() => handleConnect()}>
              Connect
            </Button>
            </HStack>
            <br></br>
          </>
        ) : (
          <>
            <HStack id="connected-to-network">
            <Icon color="white" as={AiOutlineCheckCircle}></Icon>
              <Text color="white">
                <i>connected to Rinkeby</i>
              </Text>
            </HStack>
            <br></br>
          </>
        )}
      <HStack>
        <Button bg="white" color="black" onClick={toggleP}>Create Product</Button>
        <Button bg="white" color="black" onClick={toggleUp}>Update Product</Button>
        <Button bg="white" color="black" onClick={toggleI}>Create Item</Button>
        <Button bg="white" color="black" onClick={toggleUi}>Update Item</Button>
        <Button>Ready for Auction</Button>
      </HStack>
      <HStack>
        <Button>Set Bid Status</Button>
        <Button>Set Sale Status</Button>
        <Button>Set Shipping Status</Button>
        <Button>Set Delivery Status</Button>
      </HStack>
    </VStack>
    <VStack>

    {p && <CreateProduct />}
    {up && <UpdateProduct />}
    {i && <CreateItem />}
    {ui && <UpdateItem />}
    </VStack>
    </>

  );
}
