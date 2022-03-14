import { useContext } from "react";
import AppContext from "./AppContext";
import { Button, Image, Text } from "@chakra-ui/react";
import useENS from "../hooks/useENS";

export default function Account() {
  const value = useContext(AppContext);
  const { account } = value.state;
  const { ensName, ensAvatar } = useENS(account);

  const truncateAddress = (account) => {
    return (
      account.substr(0, 5) +
      "..." +
      account.substr(account.length - 4, account.length)
    );
  }

  return (
    <Button color="white" variant="link" onClick={value.connect} border="none">
      {ensAvatar && (
        <Image
          src={ensAvatar}
          alt={account}
          rounded="full"
          height={25}
          width={25}
          marginRight={2}
        />
      )}
      {account == null ? "connect" : ensName || truncateAddress(account)}
    </Button>
  );
}
