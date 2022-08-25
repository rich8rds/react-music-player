import { BsShuffle } from 'react-icons/bs'
import { BiMenuAltLeft } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
import { IoIosSkipBackward, IoIosSkipForward, IoIosRepeat  } from 'react-icons/io'
import useControls from '../hooks/useControls'

const Controls = () => {
const { state, dispatch  } = useControls()

  return (
    <div className="controls">
    <div className="up">
      <BsShuffle  className={"shuffle-icon icon"}  />
      <IoIosSkipBackward  className="back-icon icon" onClick={ () => dispatch({ type: "SKIP_BACKWARD", value: -1 }) } />

    { state.isPlaying ? 
      <BsPauseCircleFill className='play-icon icon' onClick={ () => dispatch({ type: "ISPLAYING", value: !state.isPlaying, isLoaded: false }) }/> :
      <BsPlayCircleFill  className="play-icon icon"  onClick={ () => dispatch({ type: "ISPLAYING", value: !state.isPlaying, isLoaded: true }) } />
    }
      <IoIosSkipForward  className="forward-icon icon" onClick={ () => dispatch({ type: "SKIP_FORWARD", value: 1 }) } />
      <IoIosRepeat  className={  state.loop ? "icon-active":"repeat-icon icon" } onClick={ () => dispatch( { type: "LOOP", value: !state.loop }) } />

    </div>
    <div className="down">
      <BiMenuAltLeft  className={ `"re-icon icon" :  "light icon "`} />

      { state.musicDataList[state.curr_index].isFavorite ? <AiFillHeart className="like-icon icon iconRed" onClick={() => dispatch( { type: "LIKE_UNLIKE", value: false }) }/> :
          <AiOutlineHeart  className="like-icon icon" onClick={() => dispatch( { type: "LIKE_UNLIKE", value: true }) }/> }
    </div>
  </div>
  )
}

export default Controls