import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { useWallet } from '@solana/wallet-adapter-react'                           // This is for subscription feature.
import Payment from './Payment'

const styles = {
  loginPage : 'w-screen h-screen bg-white flex justify-center flex-col items-center',
  text : 'text-4xL text-black mb-10',
  
}


const Login = () => {

  const wallet = useWallet()                                        // Getting the instance of connected wallet.

  if(wallet.connected) return <Payment/>                            // If the wallet is connected, then we are directed to payment page.

  return (
    
    <div className = {styles.loginPage}>
      <p className = {styles.text}>Login to access this app</p>
      <WalletMultiButton/>
    </div>

  )
}

export default Login