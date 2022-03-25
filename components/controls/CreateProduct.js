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
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import inventory from "../eth/inventory";
import { addresses } from "../eth/addresses";


export default function CreateProduct() {
  const value = useContext(AppContext);
  const { web3, account } = value.state;
  const [didSubmit, setDidSubmit] = useState(false);

  const { handleSubmit, register, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });

  const handleSubmission = async (values) => {
    const { brand, product, variant } = values;
    
        let types = []
        let quantities = []
        for (let i = 0; i < variant.length; i++) {
          types.push(variant[i].type)
          quantities.push(variant[i].quantity)
        }
    
    if (web3 === null) {
      value.toast("Please connect your wallet")
    } else {
      const factory = inventory(addresses.inventory, web3)
      try {
        let result = await factory.methods.createProduct(brand, product, types, quantities).send({ from: account })
        console.log("This is the result", result)
        setDidSubmit(true)
      } catch(e) {
        console.log(e)
      }
    }

  }

  useEffect(() => {
    append({ variant: "" });
  }, []);

  return (
    <VStack w="70%" mt="5vh" as="form" onSubmit={handleSubmit(handleSubmission)} alignItems="center" spacing="5%">
      <Heading as="h1" color="whiteAlpha.800">
        <b>Create Product</b>
      </Heading>
      <br></br>
      <HStack w="80%" spacing="10%">
        <FormControl isRequired>

        <FormLabel color="whiteAlpha.800">Brand: </FormLabel>
        <Input
          w="100%"
          color="white"
          name="brand"
          placeholder="LGT"
          {...register("brand")}
        />
        </FormControl>
      </HStack>
      <HStack w="80%" spacing="10%">
        <FormControl isRequired>

        <FormLabel color="whiteAlpha.800">Product: </FormLabel>
        <Input
          w="100%"
          color="white"
          name="product"
          placeholder="e.g., Crewneck, Varsity Jacket, Socks"
          {...register("product")}
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
        Create
      </Button>
      {didSubmit && <Text color="green">Product Created!</Text>}
    </VStack>
  );
}