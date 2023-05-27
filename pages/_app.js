import dynamic from 'next/dynamic'         // We have to dynamically import our WalletConnectionProvider

import '../styles/globals.css'

import {AudioProvider} from '../context/context'

require('@solana/wallet-adapter-react-ui/styles.css')

const WalletConnectionProvider = dynamic(                            // Here we are just importing WalletConnectionProvider (dynamically)
  () => import('../context/WalletConnectionProvider'),
  {
    ssr :false,
  }
)



function MyApp({ Component, pageProps }) {
  return(
    <WalletConnectionProvider>
      <AudioProvider>
       <Component {...pageProps} />                                  
      </AudioProvider>
    </WalletConnectionProvider>
  )
  
}

export default MyApp;
