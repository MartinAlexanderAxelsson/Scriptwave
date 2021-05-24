import React, { useState, useEffect, useContext } from "react"
import Controls from "./Controls"
import Keyboard from "./Keyboard"
import "./styles/oscillators.scss"
import { AudioContext } from "../context/AudioContext"
import MIDI from "./MIDI"
import warning from "../images/warning_icon.png"

export default function Oscillators() {
  const { audio } = useContext(AudioContext)

  const [f, setF] = useState(349.228)
  const [gb, setGb] = useState(369.994)
  const [g, setG] = useState(391.995)
  const [ab, setAb] = useState(415.305)
  const [a, setA] = useState(440)
  const [bb, setBb] = useState(466.164)
  const [b, setB] = useState(493.883)
  const [c, setC] = useState(523.251)
  const [db, setDb] = useState(554.365)
  const [d, setD] = useState(587.33)
  const [eb, setEb] = useState(622.254)
  const [e, setE] = useState(659.255)
  const [f2, setF2] = useState(698.456)
  const [gb2, setGb2] = useState(739.989)
  const [g2, setG2] = useState(783.991)
  const [ab2, setAb2] = useState(830.609)
  const [a2, setA2] = useState(880)
  const [bb2, setBb2] = useState(932.328)
  const [b2, setB2] = useState(987.767)

  const notes = {
    KeyA: f,
    KeyW: gb,
    KeyS: g,
    KeyE: ab,
    KeyD: a,
    KeyR: bb,
    KeyF: b,
    KeyG: c,
    KeyY: db,
    KeyH: d,
    KeyU: eb,
    KeyJ: e,
    KeyK: f2,
    KeyO: gb2,
    KeyL: g2,
    KeyP: ab2,
    Semicolon: a2,
    BracketLeft: bb2,
    Quote: b2,
  }

  //   const MIDI_notes = {
  //     key53: "KeyA",
  //     key54: "KeyW",
  //     key55: "KeyS",
  //     key56: "KeyE",
  //     key57: "KeyD",
  //     key58: "KeyR",
  //     key59: "KeyF",
  //     key60: "KeyG",
  //     key61: "KeyY",
  //     key62: "KeyH",
  //     key63: "KeyU",
  //     key64: "KeyJ",
  //     key65: "KeyK",
  //     key66: "KeyO",
  //     key67: "KeyL",
  //     key68: "KeyP",
  //     key69: "Semicolon",
  //     key70: "BracketLeft",
  //     key71: "Quote",
  //   }

  function octaveUp() {
    setF(f * 2)
    setGb(gb * 2)
    setG(g * 2)
    setAb(ab * 2)
    setA(a * 2)
    setBb(bb * 2)
    setB(b * 2)
    setC(c * 2)
    setDb(db * 2)
    setD(d * 2)
    setEb(eb * 2)
    setE(e * 2)
    setF2(f2 * 2)
    setGb2(gb2 * 2)
    setG2(g2 * 2)
    setAb2(ab2 * 2)
    setA2(a2 * 2)
    setBb2(bb2 * 2)
    setB2(b2 * 2)
  }

  function octaveDown() {
    setF(f / 2)
    setGb(gb / 2)
    setG(g / 2)
    setAb(ab / 2)
    setA(a / 2)
    setBb(bb / 2)
    setB(b / 2)
    setC(c / 2)
    setDb(db / 2)
    setD(d / 2)
    setEb(eb / 2)
    setE(e / 2)
    setF2(f2 / 2)
    setGb2(gb2 / 2)
    setG2(g2 / 2)
    setAb2(ab2 / 2)
    setA2(a2 / 2)
    setBb2(bb2 / 2)
    setB2(b2 / 2)
  }

  const waveForms = {
    sine: "sine",
    square: "square",
    sawtooth: "sawtooth",
    triangle: "triangle",
  }

  const filterTypes = {
    lowpass: "lowpass",
    bandpass: "bandpass",
    highpass: "highpass",
  }
  const [waveFormOsc1, setWaveFormOsc1] = useState("sine")
  const [waveFormOsc2, setWaveFormOsc2] = useState("sine")
  const [selectedFilterType, setSelectedFilterType] = useState("lowpass")

  const [masterVolSlider, setMasterVolSlider] = useState(0.25)
  const [osc_1_VolSlider, setOsc_1_VolSlider] = useState(0.25)
  const [osc_2_VolSlider, setOsc_2_VolSlider] = useState(0.25)
  const [osc1DetuneSlider, setOsc1DetuneSlider] = useState(0)
  const [noiseSlider, setNoiseSlider] = useState(0)

  const [filterSlider, setFilterSlider] = useState(9200)
  const [envelope_A_Slider, setEnvelope_A_Slider] = useState(0.001)
  const [envelope_D_Slider, setEnvelope_D_Slider] = useState(0.2)
  const [envelope_S_Slider, setEnvelope_S_Slider] = useState(0.2)
  const [envelope_R_Slider, setEnvelope_R_Slider] = useState(1.1)
  const [delaySlider, setDelaySlider] = useState(0)
  const [delayFeedbackSlider, setDelayFeedbackSlider] = useState(0)
  const [delayOnOff, setDelayOnOff] = useState(0)

  const [MIDI_connected, setMIDI_connected] = useState(false)

  const [darkmode, setDarkmode] = useState(true)
  const [keyMapping, setKeyMapping] = useState({
    white: "key-mapping",
    black: "key-mapping__black",
  })

  const [mainBackgroundColor, setMainBackgroundColor] = useState("#1a1a1a")
  const [synthBackgroundColor, setsynthBackgroundColor] =
    useState("rgb(77, 77, 77)")
  function toggleDarkmode() {
    if (darkmode === true) {
      setMainBackgroundColor("#1a1a1a")
      setsynthBackgroundColor("rgb(77, 77, 77)")
    } else {
      setMainBackgroundColor("#bdddda")
      setsynthBackgroundColor("#97bfc9")
    }
  }

  useEffect(() => {
    toggleDarkmode()
  }, [toggleDarkmode])

  let note
  let masterVolume = audio.createGain()
  let delay = audio.createDelay()
  let delayFeedback = audio.createGain()

  let osc_1_Volume = audio.createGain()
  let osc_2_Volume = audio.createGain()

  let filter = audio.createBiquadFilter()

  masterVolume.gain.value = masterVolSlider
  filter.q = 5
  filter.type = selectedFilterType
  filter.frequency.value = filterSlider
  //   delayFeedback.gain.value = delayOnOff
  delayFeedback.gain.value = delayFeedbackSlider
  delay.delayTime.value = delaySlider

  osc_1_Volume.gain.value = osc_1_VolSlider
  osc_2_Volume.gain.value = osc_2_VolSlider

  let key

  function oscillator_1(key) {
    let osc = audio.createOscillator()
    let envelope = audio.createGain()
    osc.detune.value = osc1DetuneSlider
    osc.frequency.value = notes[key]
    osc.type = waveFormOsc1

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(
      1,
      audio.currentTime + Number(envelope_A_Slider)
    )

    if (envelope_S_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        Number(envelope_S_Slider),
        audio.currentTime + Number(envelope_D_Slider)
      )
    } else {
      envelope.gain.linearRampToValueAtTime(
        0.01,
        audio.currentTime + Number(envelope_D_Slider)
      )
    }

    if (envelope_R_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        0,
        audio.currentTime + Number(envelope_R_Slider)
      )
    }

    osc.start(audio.currentTime)

    delay.connect(delayFeedback)
    delayFeedback.connect(delay)

    osc.connect(envelope)
    envelope.connect(osc_1_Volume)
    osc_1_Volume.connect(filter)
    filter.connect(delay)
    filter.connect(masterVolume)
    delay.connect(masterVolume)
    masterVolume.connect(audio.destination)

    osc.stop(
      audio.currentTime +
        Number(envelope_A_Slider) +
        Number(envelope_D_Slider) +
        Number(envelope_S_Slider) +
        Number(envelope_R_Slider)
    )
  }

  function oscillator_2(key) {
    let osc2 = audio.createOscillator()
    let envelope = audio.createGain()

    osc2.frequency.value = notes[key]
    osc2.type = waveFormOsc2

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(
      1,
      audio.currentTime + Number(envelope_A_Slider)
    )

    if (envelope_S_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        Number(envelope_S_Slider),
        audio.currentTime + Number(envelope_D_Slider)
      )
    } else {
      envelope.gain.linearRampToValueAtTime(
        0.01,
        audio.currentTime + Number(envelope_D_Slider)
      )
    }

    if (envelope_R_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        0,
        audio.currentTime + Number(envelope_R_Slider)
      )
    }

    osc2.start(audio.currentTime)

    osc2.connect(envelope)
    envelope.connect(osc_2_Volume)
    osc_2_Volume.connect(filter)
    filter.connect(delay)
    filter.connect(masterVolume)
    delay.connect(masterVolume)
    masterVolume.connect(audio.destination)

    osc2.stop(
      audio.currentTime +
        Number(envelope_A_Slider) +
        Number(envelope_D_Slider) +
        Number(envelope_S_Slider) +
        Number(envelope_R_Slider)
    )
  }

  function whiteNoise() {
    let noise = audio.createBufferSource()
    let envelope = audio.createGain()
    let noiseVolume = audio.createGain()
    let bufferSize = 5 * audio.sampleRate

    let buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    let output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
    noise.buffer = buffer

    envelope.gain.setValueAtTime(0, audio.currentTime)
    envelope.gain.linearRampToValueAtTime(
      1,
      audio.currentTime + Number(envelope_A_Slider)
    )

    if (envelope_S_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        Number(envelope_S_Slider),
        audio.currentTime + Number(envelope_D_Slider)
      )
    } else {
      envelope.gain.linearRampToValueAtTime(
        0.01,
        audio.currentTime + Number(envelope_D_Slider)
      )
    }

    if (envelope_R_Slider > 0) {
      envelope.gain.linearRampToValueAtTime(
        0,
        audio.currentTime + Number(envelope_R_Slider)
      )
    }

    noise.start(audio.currentTime)

    noiseVolume.gain.value = noiseSlider
    let noiseFilterLow = audio.createBiquadFilter()
    let noiseFilterHigh = audio.createBiquadFilter()
    noiseFilterLow.type = "lowpass"
    noiseFilterLow.frequency.value = 1200
    noiseFilterHigh.type = "highpass"
    noiseFilterHigh.frequency.value = 800

    noise.connect(envelope)
    envelope.connect(noiseFilterHigh)
    noiseFilterHigh.connect(noiseFilterLow)
    noiseFilterLow.connect(noiseVolume)
    noiseVolume.connect(filter)
    filter.connect(masterVolume)
    masterVolume.connect(audio.destination)

    noise.stop(
      audio.currentTime +
        Number(envelope_A_Slider) +
        Number(envelope_D_Slider) +
        Number(envelope_S_Slider) +
        Number(envelope_R_Slider)
    )
  }

  const [MIDI_alert_message, setMIDI_alert_message] = useState("none")
  const [user_interaction_message, setUser_interaction_message] =
    useState("none")
  const [check_user_interaction, setCheck_user_interaction] = useState(false)
  const listenerClick = (event) => {
    setCheck_user_interaction(true)
  }

  useEffect(() => {
    window.addEventListener("click", listenerClick)
    return () => {
      window.removeEventListener("click", listenerClick)
    }
  }, [])
  return (
    <>
      <div
        className="oscillators-wrapper"
        style={{ background: mainBackgroundColor }}
      >
        <div className="midi-message" style={{ display: MIDI_alert_message }}>
          <img className="midi-message__img" src={warning} /> The browser you
          are using does not support Web MIDI, but you can play using your
          keyboard:)
        </div>
        <div
          className="user-interaction"
          style={{ display: user_interaction_message }}
        >
          <img className="user-interaction__img" src={warning} /> Click anywhere
          on the page to enable your Midi device
        </div>
        <div
          className="oscillators"
          style={{ background: synthBackgroundColor }}
        >
          <Controls
            masterVolSlider={masterVolSlider}
            setMasterVolSlider={setMasterVolSlider}
            waveForms={waveForms}
            waveFormOsc1={waveFormOsc1}
            waveFormOsc2={waveFormOsc2}
            setWaveFormOsc1={setWaveFormOsc1}
            setWaveFormOsc2={setWaveFormOsc2}
            osc_1_VolSlider={osc_1_VolSlider}
            setOsc_1_VolSlider={setOsc_1_VolSlider}
            osc_2_VolSlider={osc_2_VolSlider}
            setOsc_2_VolSlider={setOsc_2_VolSlider}
            osc1DetuneSlider={osc1DetuneSlider}
            setOsc1DetuneSlider={setOsc1DetuneSlider}
            noiseSlider={noiseSlider}
            setNoiseSlider={setNoiseSlider}
            filterSlider={filterSlider}
            setFilterSlider={setFilterSlider}
            filterTypes={filterTypes}
            selectedFilterType={selectedFilterType}
            setSelectedFilterType={setSelectedFilterType}
            envelope_A_Slider={envelope_A_Slider}
            setEnvelope_A_Slider={setEnvelope_A_Slider}
            envelope_D_Slider={envelope_D_Slider}
            setEnvelope_D_Slider={setEnvelope_D_Slider}
            envelope_S_Slider={envelope_S_Slider}
            setEnvelope_S_Slider={setEnvelope_S_Slider}
            envelope_R_Slider={envelope_R_Slider}
            setEnvelope_R_Slider={setEnvelope_R_Slider}
            delaySlider={delaySlider}
            setDelaySlider={setDelaySlider}
            delayFeedbackSlider={delayFeedbackSlider}
            setDelayFeedbackSlider={setDelayFeedbackSlider}
            //delayOnOff={delayOnOff}
            setDelayOnOff={setDelayOnOff}
            octaveUp={octaveUp}
            octaveDown={octaveDown}
            keyMapping={keyMapping}
            setKeyMapping={setKeyMapping}
            darkmode={darkmode}
            setDarkmode={setDarkmode}
            MIDI_connected={MIDI_connected}
          />
          <Keyboard
            keyMapping={keyMapping}
            darkmode={darkmode}
            notes={notes}
            //delayOnOff={delayOnOff}
            waveForms={waveForms}
            oscillator_1={oscillator_1}
            oscillator_2={oscillator_2}
            whiteNoise={whiteNoise}
            key={key}
          />
          <MIDI
            oscillator_1={oscillator_1}
            oscillator_2={oscillator_2}
            whiteNoise={whiteNoise}
            key={key}
            // MIDI_notes={MIDI_notes}
            setMIDI_connected={setMIDI_connected}
            MIDI_connected={MIDI_connected}
            setMIDI_alert_message={setMIDI_alert_message}
            setUser_interaction_message={setUser_interaction_message}
            check_user_interaction={check_user_interaction}
          />
        </div>
      </div>
    </>
  )
}
