import Head from "next/head";
import React, { useEffect } from "react";
import { Provider } from "@src/store";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <Provider>
      <Head>
        <title>마디</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
