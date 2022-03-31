import React, { useState, useContext } from "react"
import AppContext from "../AppContext";
import {
  FormLabel,
  FormControl,
  Input,
  HStack,
  VStack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import inventory from "../eth/inventory";
import { addresses } from "../eth/addresses";

export default function CreateProduct() {
  const value = useContext(AppContext);
  const { web3, account } = value.state;
  const [didSubmit, setDidSubmit] = useState(false);

  const { handleSubmit, register, control } = useForm();

  const submit = async (values) => {
    const { itemId } = values;
    console.log(itemId)
    const factory = inventory(addresses.inventory, web3)

    try {
      let result = await factory.methods.readyForAuction([itemId]).send({ from: account })
      console.log("This is the result", result)
      setDidSubmit(true)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <VStack w="70%" mt="5vh" as="form" onSubmit={handleSubmit(submit)} alignItems="center" spacing="5%">
      <Heading as="h1" color="whiteAlpha.800">
        <b>Get Item Ready for Auction</b>
      </Heading>
      <br></br>
      <HStack w="80%" spacing="10%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Item ID: </FormLabel>
          <Input
            w="100%"
            color="white"
            name="product"
            placeholder="e.g., 0, 1, 2"
            {...register("itemId")}
          />
        </FormControl>
      </HStack>
      <Button type="submit">
        Submit
      </Button>
      {didSubmit && <Text color="green">Success!</Text>}
    </VStack>
  );
}