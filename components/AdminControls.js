import React, { useState, useContext } from "react"
import AppContext from "./AppContext";
import {
  Button,
  Icon,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
} from "@chakra-ui/react"
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai"
import { getNetworkName } from "../utils/formatters";
import CreateProduct from "./controls/CreateProduct"
// import UpdateProduct from "./controls/UpdateProduct";
import CreateItem from "./controls/CreateItem";
// import UpdateItem from "./controls/UpdateItem";
import ReadyAuction from "./controls/ReadyAuction"

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

  const toggleRa = () => {
    setP(false)
    setUp(false)
    setI(false)
    setUi(false)
    setRa(() => !ra)
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
        <HStack w="50%">
          <VStack align="flex-start">
            <Text fontStyle="italic" fontSize="3xl" color="white">Create</Text>
            <HStack>
              <Button onClick={toggleP}>Product</Button>
              <Button onClick={toggleI}>Item</Button>
            </HStack>
          </VStack>
          <Spacer></Spacer>
          <VStack align="flex-start">
            <Text fontStyle="italic" fontSize="3xl" color="white">Edit</Text>
            <HStack>
              <Button>Product</Button>
              <Button>Item</Button>
            </HStack>
          </VStack>
        </HStack>
        <br />
        <HStack  w="50%">

        <VStack align="flex-start">
          <Text fontStyle="italic" fontSize="3xl" color="white">Ready</Text>
          <HStack>
            <Button onClick={toggleRa}>Ready for Auction</Button>

          </HStack>
        </VStack>
        <Spacer />
        <VStack w="50%" align="flex-start">
          <Text fontStyle="italic" fontSize="3xl" color="white">Update</Text>
          <HStack>
            <Button>Bid Status</Button>
            <Button>Sale Status</Button>
          </HStack>
          <HStack>
            <Button>Shipping Status</Button>
            <Button>Delivery Status</Button>
          </HStack>
        </VStack>
        </HStack>
      </VStack>
      <VStack>
        {p && <CreateProduct />}
        {up && <UpdateProduct />}
        {i && <CreateItem />}
        {ui && <UpdateItem />}
        {ra && <ReadyAuction />}
      </VStack>
    </>

  );
}
