import Login from "../components/Login";

import {useContext} from 'react';
import { AudioContext } from "../context/context";

export default function Home() {

 const {updateProgress, updateVolume} = useContext(AudioContext);                   

  return (
    <div>
      <audio
        id='audio-element'
        hidden
        playsInline
        onVolumeChange={e => updateVolume(e)}
        onTimeUpdate={e => updateProgress(e)}
      />
      <Login />
    </div>
  )
}
