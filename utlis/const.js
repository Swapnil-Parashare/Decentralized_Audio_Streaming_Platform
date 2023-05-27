import { PublicKey } from "@solana/web3.js";
import audio_web3 from './audio_web3.json'

export const SOLANA_HOST = 'https://tame-holy-glade.solana-devnet.discover.quiknode.pro/ec214a2f7fdb2e72ed5797c28469d575d492e7c9/'          // RPC Endpoint (QuickNode)

export const STABLE_POOL_PROGRAM_ID  = new PublicKey("tVKpen7eZu5ZJMMJEEDDT41Fiw19orR3H1YqBqmNwGX")                                         // Deployed Smart Contract Address (beta.solpg.io)      {Address}                                   
 
export const STABLE_POOL_IDL = audio_web3                                                                                                   // Deployed Smart Contract IDL (beta.solpg.io)          {ABI}