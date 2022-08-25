import { BsPlayCircleFill } from 'react-icons/bs'

import './styles/player.scss'
import Controls from './Controls'
import useControls from '../hooks/useControls'
import { useCallback, useEffect, useRef } from 'react'

const Player = () => {
  const { state, dispatch  } = useControls()
  const updateTimerRef = useRef()

  const updateUI = useCallback(() => {
      state.track.addEventListener("canplaythrough", () =>  updateTimerRef.current = setInterval(()=> {
        if(!isNaN(state.track.duration)) {
          let currentMin = Math.floor(state.track.currentTime / 60)
          let currentSec = Math.floor(state.track.currentTime - currentMin * 60)
          let durationMin = Math.floor(state.track.duration / 60)
          let durationSec = Math.floor(state.track.duration  - durationMin * 60)
          if(currentSec < 10) currentSec = "0" + currentSec
          if(durationSec < 10) durationSec = "0" + durationSec
          if(currentMin < 10) currentMin = "0" + currentMin
          if(durationMin < 10) durationMin = "0" + durationMin
      
          dispatch({ type: "CURRENT_TIME", current_time: `${currentMin}:${currentSec}`, total_duration: `${durationMin}:${durationSec}`})
        }
      }, 1000))


    },
    [dispatch, state.track],
  )
  
  useEffect(() => {
    dispatch({ type: "LOAD", isLoaded: true})

  }, [state.track, dispatch])
  
  useEffect(() => {
    updateUI()
    state.track.addEventListener('ended', () => {  dispatch({ type: "SKIP_FORWARD", value: 1 }) })

    return () => clearInterval(updateTimerRef)
  }, [dispatch, state.loop, state.track, updateUI])

  return (
    <div className="player">
      <div className="vinyl-disk">
          <BsPlayCircleFill className={  state.track.paused ?  'img' : ' img imgIsPlaying' } />
        <h3>{ state.musicDataList[state.curr_index].title }</h3>
        <p>{ state.musicDataList[state.curr_index].artist }</p>
      </div>

      <div className="controls-section">
        <div className="range">
           <input  className="time-slider" type="range" 
           value={ state.track.currentTime } onChange={ (e) => dispatch({  type: "SLIDER_VALUE", value: e.target.value })}
           min="0" max={ state?.track.duration ? state.track.duration : "0" } />
            <div className="time-div">
              <p className="counter">{  state.current_time }</p>
              <p className="totaltime">{ state.total_time }</p>
            </div>
        </div>
          <Controls />
        </div>
    </div>
  )
}

export default Player