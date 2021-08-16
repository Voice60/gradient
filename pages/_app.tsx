import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {createContext, useState} from "react";
import Theme from "../components/theme";

function MyApp({Component, pageProps}: AppProps) {

  return <Theme>
    <Component {...pageProps} />
  </Theme>
}

export default MyApp
