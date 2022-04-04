import React, { useState, useContext, useEffect } from "react"
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
  List,
  ListItem,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  color,
  Checkbox,
  Spacer,
  Select,
  Box,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import inventory from "../eth/inventory";
import { addresses } from "../eth/addresses";
import { ethers } from "ethers";


export default function UpdateProduct() {
  const value = useContext(AppContext);
  const { web3, account, products } = value.state;
  const [didSubmit, setDidSubmit] = useState(false);
  const { handleSubmit, register, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });

  const submit = async (values) => {
    const { productId, name, variant } = values;
    console.log(values)
    
    let variants_ = []
    let quantities = []
    for (let i = 0; i < variant.length; i++) {
      variants_.push(variant[i].type)
      quantities.push(variant[i].quantity)
    }
    if (web3 === null) {
      value.toast("Please connect your wallet")
    } else {
      const factory = inventory(addresses.inventory, web3)
      try {
        console.log(productId)
        let result = await factory.methods.updateProduct(productId, name, variants_, quantities).send({ from: account })
        console.log("This is the result", result)
        setDidSubmit(true)
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    append({ variant: "" });
    console.log(products)
  }, []);

  return (
    <VStack w="70%" mt="5vh" as="form" onSubmit={handleSubmit(submit)} alignItems="center" spacing="5%">
      <Heading as="h1" color="whiteAlpha.800">
        <b>Edit Product</b>
      </Heading>
      <br></br>
      <HStack w="80%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Product: </FormLabel>
          <Select
            w="100%"
            color="white"
            name="location"
            placeholder="Select a product to mint"
            {...register("productId")}
          >
            {(products) ? (products.map(({ id, brand, name}) => (
              <option key={id} value={id}>{brand}'s {name}</option>
            ))) : null}
          </Select>
        </FormControl>
      </HStack>
      <HStack w="80%">
        <FormControl>
          <FormLabel color="whiteAlpha.800">Name: </FormLabel>
          <Input
            w="100%"
            color="white"
            name="note"
            placeholder="Name of product"
            {...register("name")}
          />
        </FormControl>
      </HStack>
      <List spacing={10} width="80%" className="alternating-list">
        {fields.map((variant, index) => (
          <ListItem
            display="flex"
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
            key={variant.id}
          >
            <Controller
              name={`variant.${index}.type`}
              control={control}
              defaultValue={variant.type}
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor={`variant.${index}.type`} color="whiteAlpha.800">
                    Type
                  </FormLabel>
                  <Input
                    color="whiteAlpha.800"
                    placeholder="e.g., color, size"
                    {...field}
                    {...register(`variant.${index}.type`, {
                      required: "You must indicate a product type!",
                    })}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={`variant.${index}.quantity`}
              control={control}
              defaultValue={variant.quantity}
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor={`variant.${index}.quantity`} color="whiteAlpha.800">
                    Quantity
                  </FormLabel>
                  <Controller
                    control={control}
                    name={`variant.${index}.quantity`}
                    min="1"
                    render={({ field: { ref, ...rest } }) => (
                      <NumberInput min="1" max="1000000000" {...rest}>
                        <NumberInputField ref={ref} name={rest.name} color="white" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                  {/* NOTE: <NumInputField/> is not compatible with react-hook-form. Using documentElementById was bypassing this and allowed for NaN and zero values.*/}
                </FormControl>
              )}
            />
            <IconButton
              className="delete-icon"
              aria-label="delete variant"
              mt={8}
              ml={2}
              icon={<AiOutlineDelete />}
              onClick={() => remove(index)}
            />
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() => append({ variant: "" })}
      >
        + Add Type
      </Button>
      <br></br>
      <Button type="submit">
        Update
      </Button>
      {didSubmit && <Text color="green">Success!</Text>}
    </VStack>
  );
}