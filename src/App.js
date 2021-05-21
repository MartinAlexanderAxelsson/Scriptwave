import React from "react"
import MIDI from "./components/MIDI"
import Oscillators from "./components/Oscillators"
import { AudioContext } from "./context/AudioContext"
function App() {

const audio = new (window.AudioContext || window.webkitAudioContext)({
    latencyHint: "interactive",
    sampleRate: 33000,
})

  return (
    <div>
      <AudioContext.Provider value={{ audio }}>
        <Oscillators />
        {/* <MIDI/> */}
      </AudioContext.Provider>
    </div>
  )
}

export default App
