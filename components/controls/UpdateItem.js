import React, { useState, useContext, useEffect } from "react";
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
  color,
  Checkbox,
  Spacer,
  Select,
  Box,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm, Controller, useFieldArray } from "react-hook-form";

export default function UpdateItem() {
  const value = useContext(AppContext);
  const { web3, account, products, items } = value.state;
  const [didSubmit, setDidSubmit] = useState(false);
  const [selection, setSelection] = useState("");
  const [token, setToken] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [form, setForm] = useState(false);
  const { handleSubmit, register, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });

  const getTokens = () => {
    let tokens_ = [];
    if (products && items) {
      // console.log("products & items are present", products[0]["brand"], items[0]["location"])
      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < products.length; j++)
          if (items[i]["productId"] === products[j]["id"]) {
            // console.log("match found - ", items[i]["productId"])
            const _token = {};
            _token.tokenId = items[i]["tokenId"];
            _token.brand = products[j]["brand"];
            _token.product = products[j]["name"];
            _token.price = items[i]["price"];
            _token.owner = items[i]["owner"];
            _token.location = items[i]["location"];
            _token.variants = items[i]["variants"];
            _token.isChipped = items[i]["isChipped"];
            _token.isDigitized = items[i]["isDigitized"];
            _token.auctionStatus = items[i]["auctionStatus"];
            _token.isShipped = items[i]["isShipped"];

            tokens_.push(_token);
            setTokens([...tokens_]);
            // console.log(products[j]["brand"], items[i].price, _token, tokens_);
          } else {
            console.log("cannot get tokens bc no match found");
          }
      }
    } else {
      console.log("cannot get tokens bc products & items not found");
    }
  };

  const getLocation = (location) => {
    switch (location) {
      case 0:
        return "Seller"
      case 1:
        return "LGT HQ"
      case 2:
        return "LGT Parnters"
      case 3:
        return "Transit"
      case 4:
        return "Buyer"
    }
  };

  const toggleForm = () => {
    console.log(form)
    setForm(!form)
    console.log(form)
  }
  const submit = async (values) => {
    const { tokenId, price, location, chip, digitization, variant, note } =
      values;

    console.log(values);

    // productId--;s
    // let variants_ = []
    // let quantities = []
    // for (let i = 0; i < variant.length; i++) {
    //   variants_.push(variant[i].type)
    //   quantities.push(variant[i].quantity)
    // }
    // if (web3 === null) {
    //   value.toast("Please connect your wallet")
    // } else {
    //   const factory = inventory(addresses.inventory, web3)
    //   try {
    //     console.log(productId)
    //     let result = await factory.methods.updateItem(productId, variants_, ethers.utils.parseEther(price), location, chip, digitization, note).send({ from: account })
    //     console.log("This is the result", result)
    //     setDidSubmit(true)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  };

  // useEffect(() => {
  //   append({ variant: "" });
  // }, []);

  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    // console.log(items, products, tokens)
    if (selection && tokens) {
      // console.log(tokens[selection]);
      setToken({
        brand: tokens[selection]["brand"]
          ? tokens[selection]["brand"]
          : "loading",
        product: tokens[selection]["product"],
        owner: tokens[selection]["owner"],
        variants: tokens[selection]["variants"],
        price: tokens[selection]["price"],
        isChipped: tokens[selection]["isChipped"],
        isDigitized: tokens[selection]["isDigitized"],
        location: tokens[selection]["location"],
      });
    }
  }, [selection]);

  return (
    <VStack
      w="70%"
      mt="5vh"
      as="form"
      onSubmit={handleSubmit(submit)}
      alignItems="center"
      spacing="5%"
    >
      <Heading as="h1" color="whiteAlpha.800">
        <b>Edit Item</b>
      </Heading>
      <HStack w="80%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Item / Token: </FormLabel>
          <Select
            w="100%"
            color="white"
            name="tokenId"
            placeholder="Select a token"
            {...register("tokenId")}
            onChange={(e) => {
              console.log(e.target.value);
              setSelection(e.target.value);
            }}
          >
            {tokens &&
              tokens.map(({ tokenId, product, brand }) => (
                <option key={tokenId} value={tokenId}>
                  Token #{tokenId} - {brand}'s {product}
                </option>
              ))}
          </Select>
        </FormControl>
      </HStack>
      <VStack w="80%" align="center">
        {selection && token ? (
          <VStack align="">
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                Price:
              </Text>
              <Text color="yellow.300" fontStyle="italic">
                {token["price"]} Ξ
              </Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                Variants:
              </Text>
              <Text color="yellow.300" fontStyle="italic">
                {token["variants"]}
              </Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                Owner:
              </Text>
              <Text h="30px" color="yellow.300" fontStyle="italic">
                {token["owner"]}
              </Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                Location:
              </Text>
              <Text h="30px" color="yellow.300" fontStyle="italic">
                {`${getLocation(token["location"])}`}
              </Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                LGT Tag:
              </Text>
              <Text h="30px" color="yellow.300" fontStyle="italic">
                {token["isChipped"] ? "✔️" : "❌"}
              </Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="white" fontStyle="italic">
                Digitization:
              </Text>
              <Text h="30px" color="yellow.300" fontStyle="italic">
                {token["isDigitized"] ? "✔️" : "❌"}
              </Text>
            </HStack>
          </VStack>
        ) : (
          ""
        )}
        <Button onClick={toggleForm}>Edit</Button>
      </VStack>
      
      {form && (
        <>
        <HStack w="80%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Price: </FormLabel>
          <Input
            w="100%"
            color="white"
            name="price"
            placeholder="e.g., 1, 2, 3"
            {...register("price")}
          />
        </FormControl>
      </HStack>
      <HStack w="80%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Owner: </FormLabel>
          <Input
            w="100%"
            color="white"
            name="owner"
            placeholder="0xLGT"
            {...register("owner")}
          />
        </FormControl>
      </HStack>
      <HStack w="80%">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Location: </FormLabel>
          <Select
            w="100%"
            color="white"
            name="location"
            placeholder="Select a location"
            {...register("location")}
          >
            <option value="0">Seller</option>
            <option value="1">LGT HQ</option>
            <option value="2">LGT Partner</option>
            <option value="3">Transit</option>
            <option value="4">Buyer</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack w="80%" spacing={10} align="stretch">
        <HStack w="40">
          <Text color="whiteAlpha.800">LGT Tag Integration</Text>
          <Checkbox color="white" name="chip" {...register("chip")} />
        </HStack>
        <Spacer />
        <HStack w="40%">
          <Text color="whiteAlpha.800">Product Digitization</Text>
          <Checkbox
            color="white"
            name="digitization"
            {...register("digitization")}
          />
        </HStack>
      </HStack>
      <HStack w="80%">
        <FormControl>
          <FormLabel color="whiteAlpha.800">Notes: </FormLabel>
          <Input
            w="100%"
            color="white"
            name="note"
            placeholder="Notes"
            {...register("note")}
          />
        </FormControl>
      </HStack>
      <List spacing={10} width="80%" className="alternating-list">
        <HStack align="flex-start">
          <Text color="whiteAlpha.900" fontSize="medium">
            Item Variant:{" "}
          </Text>
          {selection && token ? (
            <>
              <Text h="30px" color="yellow.300" fontStyle="italic">
                {token["variants"]}
              </Text>
            </>
          ) : (
            ""
          )}
          <Spacer />
          {selection && token ? (
            <>
              <Button
                size="sm"
                onClick={() => append({ variant: "" })}
                color="gray.900"
              >
                Update
              </Button>
            </>
          ) : (
            <Text color="whiteAlpha.800">Pick an item to display type</Text>
          )}
        </HStack>

        {fields.map((variant, index) => (
          <ListItem
            display="flex"
            flexDirection="row"
            justifyItems="center"
            key={variant.id}
          >
            <HStack w="100%" align="flex-start">
              <Controller
                name={`variant.${index}.type`}
                control={control}
                defaultValue={variant.type}
                render={({ field }) => (
                  <FormControl isRequired>
                    <Input
                      w="80%"
                      color="whiteAlpha.800"
                      placeholder="e.g., color, size"
                      value={token && token["variants"]}
                      {...field}
                      {...register(`variant.${index}.type`, {
                        required: "You must indicate a product type!",
                      })}
                    />
                  </FormControl>
                )}
              />
              <Spacer />
              <IconButton
                className="delete-icon"
                aria-label="delete variant"
                icon={<AiOutlineDelete />}
                onClick={() => remove(index)}
              />
            </HStack>

            {/* <Controller
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
                  /> */}
            {/* NOTE: <NumInputField/> is not compatible with react-hook-form. Using documentElementById was bypassing this and allowed for NaN and zero values.*/}
            {/* </FormControl>
              )} */}
            {/* /> */}
          </ListItem>
        ))}
      </List>
      {/* <Button onClick={() => append({ variant: "" })}>+ Add Type</Button> */}
      <br></br>
      <Button type="submit">Create</Button>
      {didSubmit && <Text color="green">Success!</Text>}
        </>
      )}
      
    </VStack>
  );
}
