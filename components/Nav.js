import React, { Component, useState, useContext, useEffect } from "react";
import AppContext from "./AppContext";
import { Spacer, HStack } from "@chakra-ui/react";
import NavRightContainer from "./NavRightContainer";
import Logo from "./Logo";


export default function Nav() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;

  return (
    <HStack minH="10vh" minW="auto" id="nav" alignItems="center" mr={"10px"}>
      <Logo />
      <Spacer />
      <NavRightContainer />
    </HStack>
  );
}
