import React, { useState, useContext } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";


export default function Layout({ children }) {

  return (
    <>
      <Box bg="black">
        <Head >
          <title>LGT Inventory</title>
          <meta
            property="og:title"
            content="LGT Inventory Sytem"
            key="title"
          />
        </Head>
        <Nav/>
        { children }
        <Footer />
      </Box>
    </>
  );
}
