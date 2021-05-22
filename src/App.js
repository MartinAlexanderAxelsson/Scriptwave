import React, { useState } from "react"

import Oscillators from "./components/Oscillators"
import "./App.scss"
import { AudioContext } from "./context/AudioContext"
function App() {
  const audio = new (window.AudioContext || window.webkitAudioContext)({
    latencyHint: "interactive",
    sampleRate: 33000,
  })

  if (!audio) {
    alert("Web Audio API is not supported in this browser")
  }


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
