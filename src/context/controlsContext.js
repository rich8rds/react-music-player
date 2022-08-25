import { PlayerReducer, INITIAL_STATE } from "./playerReducer";
const { createContext, useReducer } = require("react");

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PlayerReducer, INITIAL_STATE);
  return(
    <PlayerContext.Provider value={ { state, dispatch } }>
      { children }
    </PlayerContext.Provider>
  )
}