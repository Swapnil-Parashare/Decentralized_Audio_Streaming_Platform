// This is our custom hook.

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";      // We can get the instance of connected wallet.
import { SOLANA_HOST } from "../utlis/const";                  // Our Endpoint.
import { getProgramInstance } from "../utlis/utils"            // With the help of this, we can create our program instance.

const anchor = require('@project-serum/anchor');
const utf8 = anchor.utils.bytes.utf8;
const {web3, BN} = anchor;
const { SystemProgram } = web3;

const defaultAccounts = {
    tokenProgram : TOKEN_PROGRAM_ID,
    clock : anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram : SystemProgram.programId
}

const useSC = (
    musicUrl,
    title,
    setTitle,
    setMusicUrl,
    setShowUploadMusic
) => {

    // SMART CONTRACT INSTANCE CREATION.

    const wallet = useWallet();                                       // Wallet Instance
    const connection = new anchor.web3.Connection(SOLANA_HOST);       // Connection
    const program = getProgramInstance(connection,wallet);            // Using "Wallet Instance + Connection" Smart Contract Instance is created.

    // Smart Contract Instances is created above. Now below functions are carried out using this instance (program).



    // 1] Fetching all the songs from Smart Contract.

    const getSongs = async () => {
        console.log("Fetching Songs");
        const songs = await program.account.musicAccount.all();
        console.log(songs);
        return songs;
    }


    // 2] Uploading new song to Smart Contract.

    const newMusic = async() =>
    {
        const randomKey = anchor.web3.Keypair.generate().publicKey;

        let [music_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('music'),randomKey.toBuffer()],
            program.programId
        )

        const tx = await program.rpc.createMusic(                   // Calling this function cost money. So its basically a transaction.
            title,
            musicUrl,
            {
              accounts: {
                music: music_pda,
                randomkey: randomKey,
                authority: wallet.publicKey,
                ...defaultAccounts,
              },
            },
          )
      
          console.log(tx)
      
          setTitle('')                                              // Updating the state back to normal, after the song(url) has been uploaded to Smart Contract.
          setMusicUrl('')
          setShowUploadMusic(false)
    }

    return { newMusic, getSongs };
}

export default useSC;

