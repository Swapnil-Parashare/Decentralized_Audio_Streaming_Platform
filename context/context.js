import { createContext, useState, useEffect } from "react";

export const AudioContext = createContext();          // createContext() is a hook.

export const AudioProvider = ({children}) =>{

    const [currentSong, setCurrentSong] = useState({})
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(false)
    const [volume, setVolume] = useState(false)
    const [timestamp, setTimestamp] = useState()

    const pause = () => {
        setIsPaused(true);
        document.querySelector('#audio-element').pause();
    }

    const play = () => {
        setIsPaused(false);
        document.querySelector('#audio-element').play();
    }

    const playOnSelect = (song) => {
        try{
            document.querySelector('#audio-element').src = song.musicUrl;
            document.querySelector('#audio-element').play();
            setCurrentSong(song);
            setIsPlaying(true);
            setIsPaused(false);
        }catch (e){
            console.log(e.message);
        }
    }

    const secondsToMin = (value) => {
        const minute = Math.round(value/60);
        let second = Math.round(value%60);

        second = second >= 10 ? second : '0' + second;
        return minute + ':' + second;
    }

    const updateProgress = e => {
        const _progress = e.target.currentTime/ e.target.duration;
        setProgress(_progress.toFixed(2) * 100);
    }

    const updateVolume = e => {
        try {
            setVolume(e.target.value);
            document.querySelector('#audio-element').volume = e.target.value;
        } catch (error) {
            console.log(error.message);
        }
    }

    const onProgressChange = (e) => {
        const _progress = e.target.value / 100
        document.querySelector('#audio-element').currentTime = _progress * document.querySelector('#audio-element').duration
      }
    
      const onVolumeChange = (e) => {
        const _volume = e.target.value / 100
        document.querySelector('#audio-element').volume = _volume
    
      }
    
      const playNext = (songs) => {
        const id = songs.findIndex(value => value.account === currentSong);
        if (songs.length === id + 1) {
          playOnSelect(songs[0].account)
          setCurrentSong(songs[0].account)
          return
        }
        const nextSong = songs[id + 1];
        playOnSelect(nextSong.account);
      }
    
      const playPrevious = (songs) => {
        const id = songs.findIndex(value => value.account === currentSong);
        if (id === 0) {
          playOnSelect(songs[songs.length - 1].account)
          setCurrentSong(songs[songs.length - 1].account)
          return
        }
        const previousSong = songs[id - 1];
        playOnSelect(previousSong.account);
      }


    

    return <AudioContext.Provider value={{
            isPlaying, setIsPlaying,
            currentSong, setCurrentSong,
            isPaused, setIsPaused,
            play, pause,
            updateProgress, progress,
            playOnSelect,
            onProgressChange,
            playNext,
            playPrevious,
            timestamp,
            updateVolume,
            volume,
            onVolumeChange,
        }}>
        {children}
        </AudioContext.Provider>

}

