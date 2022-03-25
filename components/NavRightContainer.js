import React, { useContext, useEffect, useState } from "react";
import { IconButton, HStack, Text, Button } from "@chakra-ui/react";
import Account from "./Account";
import Chain from "./Chain";
import { BiCopy } from "react-icons/bi";
import AppContext from "./AppContext";
import Link from "next/link";

export default function NavRightContainer() {
  const value = useContext(AppContext);
  const { account } = value.state;
  const [isAdmin, setIsAdmin] = useState(false);
  const admin = [
    "0x4744cda32be7b3e75b9334001da9ed21789d4c0d",
    "0x438b52BB250C5E8b6b41be30a93139f92b3c1DA8",
    "0x8494DF1b8e7508943DE2385331001363e5EA6038",
  ];

  const copy = async () => {
    await navigator.clipboard.writeText(account);
  };

  useEffect(() => {
    if (account) {
      admin.includes(account.toLowerCase())
        ? setIsAdmin(true)
        : setIsAdmin(false);
    }
  }, [account]);

  return (
    <>
      <HStack h="45px" align={"center"}>
        <Link href="/admin">
          <a>
            {isAdmin && (
              <Button
                variant="outline"
                border="1px solid"
                mr="10px"
                textColor="white"
              >
                Admin
              </Button>
            )}
          </a>
        </Link>
        <HStack
          border="1.5px solid"
          color="white"
          borderRadius="xl"
          spacing={1}
          p={3}
          height="100%"
          margin={{
            sm: "10px 0 20px 0 !important",
            md: "0 !important",
            lg: "0 !important",
            xl: "0 !important",
            "2xl": "0 !important",
          }}
        >
          <Chain />
          <Account message="Connect" />
          {account ? (
            <IconButton
              onClick={() => copy()}
              icon={<BiCopy />}
              aria-label="Copy account address"
              size="xs"
              type="unstyled"
              border="none"
              background="transparent"
              id="copy-address"
            />
          ) : null}
        </HStack>
      </HStack>
    </>
  );
}
