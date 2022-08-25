import { AiOutlineLeft } from 'react-icons/ai'
import Player from './Player'
import MusicItem from './MusicItem'

import './styles/sideview.scss'
import useControls from '../hooks/useControls'

const Sideview = () => {
  const { state } = useControls()

  return (
    <section className="playlist">
      <div className='sideview'>
        <div className="nav">
          <AiOutlineLeft  className="back-icon icon" />
          <p id="player-name">Richie Player  <span style={ { color: "lightgray", fontSize: "12px", marginLeft: "12px" } }> { state.musicDataList.length } tracks </span></p>
        </div>
        <div className="musicList">
            {  state.musicDataList.map((file, index) => {
              return ( <MusicItem key={index} file={ file } index={ index }/> )
              }) }
        </div>
      </div>
        <Player />
    </section>
  )
}

export default Sideview