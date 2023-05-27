import Nav from '../components/nav'
import Activity from '../components/activity'
import { useState,useEffect } from 'react'
import Header from '../components/Header';

import useSC from '../hooks/useSC';
import UploadModal from '../components/UploadModal';

import Playlist from '../components/Playlist';
// import {songs} from '../data/songs.js';                            // For development purpose only.

import PlayerControls from '../components/PlayerControls';



const HomePage = () => {


  // Below are the states of our Current Component

  const [showUploadMusic, setShowUploadMusic] = useState(false);
  const [title, setTitle] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [songs, setSongs] = useState([]);


  // Our Custom Hook(useSC) is called to interact with deployed Smart Contract on Blockchain.

  const {newMusic, getSongs} = useSC(                                                   
    musicUrl,
    title,                                                                               
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  )


 // 1] Fetching all the preuploaded songs, using Custom Hook(useSC) function.
 
  useEffect(() => {
    getSongs().then(songs=>{                                // 1] Here 'getSongs()' function of our Custom Hook is called. It fetches all the pre-uploaded songs.
      setSongs(songs);                                      // 2] Being a 'async' function, this function returns promise, which is handled using .then()
    })                                                      // 3] Promise is resolved by returning a list of songs. 
  }, [])                                                    // 4] setSongs() function is use to update the state (songs) of our current component(HomePage)

  // console.log(songs); When a component is rendered? Component Life Cycle. 



  return (
    <div className='flex'>
      <Nav />


      <div className='w-full'>

        <Header setShowUploadMusic = {setShowUploadMusic}/>   
      
        <Playlist songs = {songs}/>

        <PlayerControls songs = {songs}/>

        {showUploadMusic && (                                                 
          <UploadModal
            title = {title}
            setTitle = {setTitle}
            setShowUploadMusic = {setShowUploadMusic}
            musicUrl ={musicUrl}
            setMusicUrl = {setMusicUrl}
            newMusic = {newMusic}
          />
        )}
      

      </div>


      <Activity />
    </div>
  )
}

export default HomePage
