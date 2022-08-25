import { useContext } from "react";
import { PlayerContext } from "../context/controlsContext";

const useControls = () => {
  return useContext(PlayerContext)
}

export default useControls