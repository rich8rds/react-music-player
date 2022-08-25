import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsSoundwave, BsPlayCircleFill } from 'react-icons/bs'
import useControls from '../hooks/useControls'
// import musicData from '../musicData'

const MusicItem = ({ file, index }) => {
  const { state, dispatch } = useControls()
  const { title, artist, duration, isFavorite, isPlaying } = file
  return (
    <div className='music-item'>
      { isPlaying ? <BsSoundwave className="isPlaying-icon icon" /> : 
            <BsPlayCircleFill  className="isPlaying-icon icon"/>   }
        <div className="title-artist" onClick={() => 
        dispatch({type: "SELECTED_TRACK",  last_index: state.curr_index, curr_index: index})}>
          <p className={ isPlaying ?  "isPlaying" : "isPlaying active"} >{ title }</p>
          <p id="artist"> { artist }</p>
        </div>
        <p className="duration"> { duration }</p>
        { isFavorite ? <AiFillHeart className="like-icon icon iconRed" onClick={() => dispatch( { type: "LIKE_UNLIKE", value: false, index: index }) }/> :
          <AiOutlineHeart  className="like-icon icon" onClick={() => dispatch( { type: "LIKE_UNLIKE", value: true , index: index}) }/> }
    </div>
  )
}

export default MusicItem