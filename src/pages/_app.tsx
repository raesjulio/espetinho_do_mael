import { AppProps } from "next/app"
import { Header } from "../components/Header/Header"
import "../../styles/global.scss"
import { QueryClientProvider } from "react-query"
import { query } from "../utils/queryClient"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <QueryClientProvider client={query}>

      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
}

export default MyApp
