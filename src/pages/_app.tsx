import { AppProps } from "next/app"
import { GlobalStyles } from "../../styles/global"
import { Header } from "../components/Header/Header"
function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Header />
    <GlobalStyles/>
    <Component {...pageProps} />
  </>
}

export default MyApp
