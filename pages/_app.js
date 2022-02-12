import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layouts";
import "./components/singleCard.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
