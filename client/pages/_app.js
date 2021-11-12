import React from "react";
import Head from 'next/head'
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsContract from "../contracts/ProductsContract.json";
import { Container } from "react-bootstrap";

const drizzleOptions = {
  contracts: [ProductsContract],
  /*  events: {
     SimpleStorage: ["StorageSet"],
   }, */
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  }
};

const drizzle = new Drizzle(drizzleOptions);

const MyApp = ({ Component, pageProps }) => {
  <Head>
    <title>Logistics-Traker</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  return (
    <Container fluid>

    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <Component drizzle={drizzle} drizzleState={drizzleState}{...pageProps} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
      </Container>

  );
}

export default MyApp;