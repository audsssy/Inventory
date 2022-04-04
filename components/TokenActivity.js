import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function TokenActivity({ loadData }) {
  const value = useContext(AppContext);
  const { products, items } = value.state;
  const [tokens, setTokens] = useState([]);

  const getTokens = () => {
    // console.log("getting tokens")
    let tokens_ = [];
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < products.length; j++)
        if (items.productId == products.productId) {
          tokens_.push({
            tokenId: items[i].tokenId,
            product: products[j].name,
            owner: items[i].owner,
            variants: items[i].variants,
            isChipped: items[i].isChipped,
            isDigitized: items[i].isDigitized,
            auctionStatus: items[i].auctionStatus,
            isShipped: items[i].isShipped,
          });
          setTokens([...tokens_]);
        }
    }

    console.log("called x times")
  };

  useEffect(() => {
    if (loadData && products && items) {
      getTokens();
    }
    console.log(products, items)
    // console.log("loadData in Token Activity - ", loadData)
  }, [loadData]);

  return (
    <Box bg="blue" color="white">
      <Table variant="unstyled">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr bg="blue.400" color={"black"}>
            <Th>ID</Th>
            <Th>Product</Th>
            <Th>Owner</Th>
            <Th>Variants</Th>
            <Th>LGT Tag</Th>
            <Th>Digitized</Th>
            <Th>Auction</Th>
            <Th>Shipping</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens
            && tokens.map(
                ({
                  tokenId,
                  product,
                  owner,
                  variants,
                  isChipped,
                  isDigitized,
                  auctionStatus,
                  isShipped,
                }) => (
                  <Tr bg={"yellow.300"} color="black">
                    <Td>{tokenId}</Td>
                    <Td>{product}</Td>
                    <Td>
                      {owner
                        ? owner.slice(0, 6) + "..." + owner.slice(-4)
                        : null}
                    </Td>
                    <Td>{variants}</Td>
                    <Td>{isChipped ? "✔️" : "❌"}</Td>
                    <Td>{isDigitized ? "✔️" : "❌"}</Td>
                    <Td>{auctionStatus}</Td>
                    <Td>{isShipped ? "✔️" : "❌"}</Td>
                  </Tr>
                )
              )}
        </Tbody>
      </Table>
    </Box>
  );
}
