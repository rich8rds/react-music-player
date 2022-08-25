const { default: musicData } = require("../musicData")

const track = document.createElement("audio")
const INITIAL_STATE = {
  track: track,
  loop: false,
  isLoaded: false,
   isPlaying: false,
   last_index: 0,
   curr_index: 0,
   slider_time: 0,
   durationSeconds: 0,
   current_time: "00:00",
   total_time: "00:00",
   musicDataList: musicData
 }
  
 const loadTrack = (track, curr_index, last_index, loop) => {
    track.pause()
    musicData[last_index].isPlaying = false
    musicData[curr_index].isPlaying = true
     track.src = musicData[curr_index].music
     track.addEventListener("canplaythrough", e => {
      if(curr_index !== last_index) track.play()
      if(loop) track.play()
    })
}

  const PlayerReducer = (state, action) => {
    switch(action.type) {
      case "LOAD": 
      if(action.isLoaded) loadTrack(state.track, state.curr_index, state.last_index)
      return { ...state, isLoaded: action.value }

      case "LOOP": 
      console.log("LOOPED SELECTED: " + action.value)
      return { ...state, loop: action.value }
      
      case "ISPLAYING":
      if(action.value) {
        state.track.play()
        return { ...state, isPlaying: action.value,  isLoaded: action.isLoaded, }
      }
      state.track.pause()
      return { ...state, isPlaying: action.value, isLoaded: action.isLoaded,  }

      case "VOLUME_UP": 
      console.log("VOLUME UP")
      return { ...state, }
      
      case "VOLUME_DOWN": 
      console.log("VOLUME DOWN")
      return { ...state, }
      
      case "SLIDER_VALUE": 
        track.currentTime = action.value
        return { ...state, durationSeconds: track.currentTime }

    case "CURRENT_TIME": 
      return { ...state, current_time: action.current_time, durationSeconds: state.track.currentTime, total_time: action.total_duration } 

    case "LIKE_UNLIKE": 
      const index = action.index ? action.index : state.curr_index
      state.musicDataList[index].isFavorite = action.value
      return { ...state  }

    case "SELECTED_TRACK": 
    state.track.pause()
    loadTrack(state.track, action.curr_index, action.last_index)
    return { ...state, last_index:action.last_index, curr_index: action.curr_index, isPlaying: true }
      
    case "SKIP_BACKWARD": 
    const  myIndex = (state.curr_index + action.value)
    if(myIndex === -1) 
      return { ...state, curr_index: 0 }
    loadTrack(state.track, myIndex, state.curr_index)
    return { ...state, last_index: state.curr_index, curr_index: myIndex, isLoaded: true, isPlaying: true }

    case "SKIP_FORWARD": 
      const  myIndex2 = state.curr_index + action.value
      if(myIndex2 >= musicData.length - 1) 
        return { ...state, curr_index: musicData.length - 1 }
        if(state.loop){
          loadTrack(state.track, state.curr_index, state.curr_index, state.loop)
          return { ...state, last_index: state.curr_index, curr_index: state.curr_index, isLoaded: true, isPlaying: true }
        }
      else  {
        loadTrack(state.track, myIndex2, state.curr_index)
        return { ...state, last_index: state.curr_index, curr_index: myIndex2, isLoaded: true, isPlaying: true }
      }

    case "RESET": 
      return { INITIAL_STATE }

    default: return state
  }
}






module.exports = { PlayerReducer, INITIAL_STATE }
