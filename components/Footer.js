import {
    Text,
    HStack,
    Stack,
    Button,
    Spacer,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FiTwitter, FiGithub, FiUsers } from "react-icons/fi";
  
  const SocialButton = (props) => {
    return (
      <Button
        border="none"
        variant="none"
        bg="none"
        rounded={"full"}
        as={"a"}
        href={props.href}
        target="_blank"
      >
        {props.children}
      </Button>
    );
  };
  
  export default function Footer() {
    return (
      <HStack minH="5vh" minW="auto" spacing={4} id="footer">
        <Text color="white" w="100%" align="center" alignContent={"center"} fontSize="xs">
          For LGT internal use only
        </Text>
      </HStack>
    );
  }
  