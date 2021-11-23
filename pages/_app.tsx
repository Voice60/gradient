import '../styles/globals.scss'
import '../styles/utils.module.scss'
import type {AppProps} from 'next/app'
import Theme from "../components/theme";

function MyApp({Component, pageProps}: AppProps) {

  return <Component {...pageProps} />
}

export default MyApp
