import './App.scss';
// import Player from './components/Player';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <MusicPlayer />
          {/* <Player /> */}
      </header>
    </div>
  );
}

export default App;
