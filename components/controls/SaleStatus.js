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
import { toDecimal, fromDecimals } from "../../utils/formatters"
import inventoryNFT from "../eth/InventoryNft";


export default function CreateProduct() {
  const value = useContext(AppContext);
  const { web3, account } = value.state;
  const [didCreateProduct, setDidCreateProduct] = useState(false);

  const { handleSubmit, register, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });



  const handleProductSubmission = async (values) => {
    const { product, variant} = values;

    const address = "0x4378E438F6794a319D2Ee6A52E8AA42911Ae63ae"
    const factory = inventoryNFT(address, web3)

    let types = []
    let quantities = []
    for (let i = 0; i < variant.length; i++) {
      types.push(variant[i].type)
      quantities.push(variant[i].quantity)
    }

    try {
      let result = await factory.methods.createProduct(product, types, quantities).send({ from: account })
      console.log("This is the result", result)
      setDidCreateProduct(true)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (web3 === null) {
      
    }


    append({ variant: "" });
  }, []);

  return (
    <VStack w="70%" mt="5vh" as="form" onSubmit={handleSubmit(handleProductSubmission)} alignItems="center" spacing="5%">
      <Heading as="h1" color="whiteAlpha.800">
        <b>Create a Product</b>
      </Heading>
      <br></br>
      <HStack w="80%" spacing="10%">
        <FormControl isRequired>

        <FormLabel color="whiteAlpha.800">Name: </FormLabel>
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
      {didCreateProduct && <Text color="green">Product Created!</Text>}
    </VStack>
  );
}