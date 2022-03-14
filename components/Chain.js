import { useContext } from "react";
import AppContext from "./AppContext";
import { Button, Text, Icon, Divider } from "@chakra-ui/react";
import { IoIosGitNetwork } from "react-icons/io";

export const supportedChains = [
    {
      chainId: 1,
      hexChain: "0x1",
      name: "Ethereum",
      infura: "mainnet.infura.io",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://main-light.eth.linkpool.io"],
      blockExplorerUrls: ["https://etherscan.io"],
      maxBlocks: null,
    },
    {
      chainId: 42161,
      hexChain: "0xa4b1",
      name: "Arbitrum",
      infura: "arbitrum-mainnet.infura.io",
      nativeCurrency: {
        name: "Arbitrum Ether",
        symbol: "AETH",
        decimals: 18,
      },
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://arbiscan.io"],
      maxBlocks: 20000,
    },
    {
      chainId: 137,
      hexChain: "0x89",
      name: "Polygon",
      infura: "polygon-mainnet.infura.io",
      nativeCurrency: {
        name: "Polygon",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
      maxBlocks: 3000,
    },
    {
      chainId: 4,
      hexChain: "0x4",
      name: "Rinkeby (testnet)",
      infura: "rinkeby.infura.io",
      nativeCurrency: {
        name: "Rinkeby Ether",
        symbol: "rETH",
        decimals: 18,
      },
      rpcUrls: ["https://rinkeby-light.eth.linkpool.io"],
      blockExplorerUrls: ["https://rinkeby.etherscan.io"],
      maxBlocks: null,
    },
  ];

export default function Chain() {
  const value = useContext(AppContext);
  const { account, chainId, daoChain } = value.state;

  const getNetworkName = (chainId) => {
    var networkName = "unsupported";
    for (var i = 0; i < supportedChains.length; i++) {
      if (supportedChains[i]["chainId"] == chainId) {
        networkName = supportedChains[i]["name"];
      }
    }
    return networkName;
}

  return (
    <>
      {chainId == null ? null : (
        <>
        <Icon as={IoIosGitNetwork} />
        <Button color="white" variant="link" border="none">
          {getNetworkName(chainId)}
          <Divider
            orientation="vertical"
            height="20px"
            border="1px solid"
            opacity="1.0"
            ml={2}
            mr={1}
          />
        </Button>
        </>
      )}
    </>
  );
}
