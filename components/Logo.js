import { HStack, Box, Text } from "@chakra-ui/react";
import logo from "../public/logo.png"
import logo2 from "../public/vercel.svg"
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Box color={"white"}
      display={{
        sm: "block",
        md: "block",
        lg: "block",
        xl: "block",
        "2xl": "block",
      }}
    >
      <Link href="/">
        <a>
          <HStack ml={"10px"}>
            <Image height="20px" width="20px" src={logo}></Image>
            <Text>LGT Inventory</Text>
          </HStack>
        </a>
      </Link>
    </Box>
  );
}
