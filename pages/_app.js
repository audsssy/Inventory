import { ChakraProvider, Container, toast } from "@chakra-ui/react";
import AppContext from "../components/AppContext";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import theme from "../styles/theme";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/700.css";
const inventoryAbi = require("../abi/inventory.json");
const inventoryNftAbi = require("../abi/inventoryNft.json");
import { createToast } from "../utils/toast";
// import { correctNetwork } from "../utils/network";
import { getNetworkName, getChainInfo } from "../utils/formatters";
// import { supportedChains } from "../constants/supportedChains";
// import "../styles/style.css";
import Layout from "../components/Layout";
import { ethers } from "ethers";
import { addresses } from "../components/eth/addresses";
import { fetchProduct } from "../components/eth/fetchProduct";
import { fetchItem } from "../components/eth/fetchItem";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [daoChain, setDaoChain] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleView, setVisibleView] = useState(1);
  const [remount, setRemount] = useState(0);
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [products, setProducts] = useState(null);
  const [numOfItems, setNumberOfItems] = useState(0);
  const [items, setItems] = useState(null);
  // const [tokens, setTokens] = useState(null);

  let provider;
  let signer;
  if (typeof window !== "undefined") {
    // console.log('You are on the browser')
    // ✅ Can use window here
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    signer = provider.getSigner();
  } else {
    // console.log('You are on the server')
    // ⛔️ Don't use window here
  }
  const inventoryContract = new ethers.Contract(
    addresses.inventory,
    inventoryAbi,
    signer
  );
  const inventoryNftContract = new ethers.Contract(
    addresses.inventoryNft,
    inventoryNftAbi,
    signer
  );

  const subscribe = async (provider) => {
    provider.on("networkChanged", (net) => changeChain(net));
    provider.on("accountsChanged", (accounts) => changeAccount(accounts));
    provider.on("connect", () => {});

    provider.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  const getProductCount = async () => {
    const productId = await inventoryContract.productId();
    productId = parseInt(ethers.utils.formatUnits(productId, "wei"));
    setNumOfProducts(productId);
  };

  const getProducts = async () => {
    var _products = [];

    for (var i = 0; i < numOfProducts; i++) {
      const product = await fetchProduct(i);
      _products.push(product);
    }
    setProducts([..._products]);
  };

  const getItemCount = async () => {
    const tokenId = await inventoryNftContract.totalSupply();
    tokenId = parseInt(ethers.utils.formatUnits(tokenId, "wei"));
    setNumberOfItems(tokenId);
  };

  const getItems = async () => {
    var _items = [];

    for (var i = 0; i < numOfItems; i++) {
      const item = await fetchItem(i);
      _items.push(item);
    }
    setItems([..._items]);
  };

  // const getTokens = () => {
  //   let tokens_ = [];
  //   // console.log(items, products)
  //   if (products && items) {
  //     console.log("products & items are present", products[0]["brand"], items[0]["tokenId"])
  //     for (var i = 0; i < items.length; i++) {
  //       for (var j = 0; j < products.length; j++)
  //         if (items[i]["productId"] === products[j]["id"]) {
  //           console.log("match found - ", items[i]["productId"])
  //           const _token = {}
  //           _token.tokenId = items[i]["tokenId"]
  //           _token.brand = products[j]["brand"]
  //           _token.price = items[i].price
  //           _token.owner = items[i].owner
  //           _token.variants = items[i].variants
  //           _token.isChipped = items[i].isChipped
  //           _token.isDigitized = items[i].isDigitized
  //           _token.auctionStatus = items[i].auctionStatus
  //           _token.isShipped = items[i].isShipped

  //           tokens_.push(_token);
  //           setTokens([...tokens_]);
  //           console.log(products[j]["brand"], items[i].price, _token, tokens_)
  //         } else {
  //           console.log("cannot get tokens bc no match found")
  //         }
  //     } 
  //   } else {
  //     console.log("cannot get tokens bc products & items not found")
  //   }
  // };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      subscribe(window.ethereum);
    }

    getProductCount();
    getItemCount();
  }, []);

  useEffect(() => {
    if (numOfProducts) {
      getProducts();
    }
    if (numOfItems) {
      getItems();  
    }
  }, [numOfProducts, numOfItems]);

  // useEffect(() => {
  //   getTokens();
  // }, [items]);

  // useEffect(() => {

  // }, [tokens]);


  const connect = async () => {
    try {
      if (typeof window !== "undefined") {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
            },
          },
        };
        // We are in the browser and metamask is running.
        const web3Modal = new Web3Modal({
          providerOptions,
        });

        const provider = await web3Modal.connect();

        let web3 = new Web3(provider);

        const chain = await web3.eth.getChainId();

        const accounts = await web3.eth.getAccounts();

        const account = accounts[0];

        setWeb3(web3);
        setAccount(accounts[0]);
        setChainId(chain);
        subscribe(provider);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeAccount = async (accounts) => {
    setAccount(accounts[0]);
  };

  const changeChain = async (net) => {
    if (net != undefined) {
      setChainId(net);
    }
  };

  const switchChain = async (net) => {
    let chainInfo = getChainInfo(net);
    let hex = chainInfo.hexChain;
    console.log("hex", hex);
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      });
    } catch (e) {
      if (e.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hex,
                chainName: chainInfo.name,
                nativeCurrency: chainInfo.nativeCurrency,
                rpcUrls: chainInfo.rpcUrls,
                blockExplorerUrls: chainInfo.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      } else {
        console.log(e);
      }
    }
  };

  // const isCorrectChain = async () => {
  //   if (address != null) {
  //     if (chainId != daoChain) {
  //       try {
  //           await switchChain(daoChain);
  //         } catch(e) {
  //           let name = getNetworkName(daoChain);
  //           console.log("Please connect to the " + name + " network.");
  //       }
  //     }
  //   } else {
  //     var supported = false;
  //     for (var i = 0; i < supportedChains.length; i++) {
  //       if (supportedChains[i]["chainId"] == chainId) {
  //         supported = true;
  //       }
  //     }
  //     if (supported == false) {
  //       console.log("This network is not currently supported.");
  //     }
  //   }
  // };

  const toast = (props) => {
    createToast(props);
  };

  return (
    <ChakraProvider>
      <AppContext.Provider
        value={{
          state: {
            web3: web3,
            account: account,
            chainId: chainId,
            daoChain: daoChain,
            loading: loading,
            address: address,
            abi: inventoryAbi,
            visibleView: visibleView,
            remount: remount,
            products: products,
            numOfProducts: numOfProducts,
            items: items,
            numOfItems: numOfItems,
          },
          setWeb3: setWeb3,
          setAccount: setAccount,
          setChainId: setChainId,
          setDaoChain: setDaoChain,
          setLoading: setLoading,
          setAddress: setAddress,
          connect: connect,
          setVisibleView: setVisibleView,
          setRemount: setRemount,
          switchChain: switchChain,
          toast: toast,
        }}
      >
        <Layout>
          <Container
            minH="90vh"
            minW="container.lg"
            alignItems="center"
            justifyContent="center"
            style={{
              overflowX: "scroll",
            }}
          >
            <Component {...pageProps} />
          </Container>
        </Layout>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
