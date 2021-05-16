import React, { useState, useEffect } from "react"
import "./controls.scss"
export default function Controls({
  masterVolSlider,
  setMasterVolSlider,
  waveForms,
  setWaveFormOsc1,
  setWaveFormOsc2,
  osc_1_VolSlider,
  setOsc_1_VolSlider,
  osc_2_VolSlider,
  setOsc_2_VolSlider,
  osc1DetuneSlider,
  setOsc1DetuneSlider,
  noiseSlider,
  setNoiseSlider,
  filterSlider,
  setFilterSlider,
  filterTypes,
  setFilterType,
  envelope_A_Slider,
  setEnvelope_A_Slider,
  envelope_D_Slider,
  setEnvelope_D_Slider,
  envelope_S_Slider,
  setEnvelope_S_Slider,
  envelope_R_Slider,
  setEnvelope_R_Slider,
  delaySlider,
  setDelaySlider,
  //delayOnOff,
  setDelayOnOff,
  octaveUp,
  octaveDown,
  keyMapping,
  setKeyMapping,
}) {
  function toggleChecked() {
    if (keyMapping.white === "key-mapping__hidden") {
      setKeyMapping({
        ...keyMapping,
        white: "key-mapping",
        black: "key-mapping__black",
      })
    } else {
      setKeyMapping({
        ...keyMapping,
        white: "key-mapping__hidden",
        black: "key-mapping__black__hidden",
      })
    }
  }

  useEffect(() => {
    console.log(keyMapping)
    if (delaySlider == 0) {
      setDelayOnOff(0)
    } else {
      setDelayOnOff(0.2)
    }
  }, [delaySlider])
  return (
    <div>
      <div>
        <input
          onChange={(e) => setMasterVolSlider(e.target.value)}
          type="range"
          min="0"
          max="1"
          defaultValue={masterVolSlider}
          step="0.1"
        ></input>
        <label>Volume</label>
        <button onClick={octaveUp}>Octave up</button>
        <button onClick={octaveDown}>Octave down</button>
      </div>
      <div>
        <div>
          <input
            onChange={(e) => setOsc_1_VolSlider(e.target.value)}
            type="range"
            min="0"
            max="1"
            defaultValue={osc_1_VolSlider}
            step="0.1"
          ></input>
          <label>Osc1</label>
          <input
            onChange={(e) => setOsc_2_VolSlider(e.target.value)}
            type="range"
            min="0"
            max="1"
            defaultValue={osc_2_VolSlider}
            step="0.1"
          ></input>
          <label>Osc2</label>
        </div>
        <div>
          <button onClick={(e) => setWaveFormOsc1(waveForms.sine)}>sin1</button>
          <button onClick={(e) => setWaveFormOsc1(waveForms.sawtooth)}>
            saw1
          </button>
          <button onClick={(e) => setWaveFormOsc1(waveForms.triangle)}>
            tri1
          </button>
          <button onClick={(e) => setWaveFormOsc1(waveForms.square)}>
            Sqr1
          </button>

          <button onClick={(e) => setWaveFormOsc2(waveForms.sine)}>sin</button>
          <button onClick={(e) => setWaveFormOsc2(waveForms.sawtooth)}>
            saw
          </button>
          <button onClick={(e) => setWaveFormOsc2(waveForms.triangle)}>
            tri
          </button>
          <button onClick={(e) => setWaveFormOsc2(waveForms.square)}>
            Sqr
          </button>
        </div>
      </div>
      <div>
        <input
          onChange={(e) => setOsc1DetuneSlider(e.target.value)}
          type="range"
          min="-1000"
          max="1000"
          defaultValue={osc1DetuneSlider}
          step="1"
        ></input>
        <label>Detune</label>
        <input
          onChange={(e) => setNoiseSlider(e.target.value)}
          type="range"
          min="0"
          max="2"
          defaultValue={noiseSlider}
          step="0.1"
        ></input>
        <label>Noise</label>
      </div>
      <div>
        <div>LOGO</div>
        <div>
          <button onClick={(e) => setFilterType(filterTypes.lowpass)}>
            low
          </button>
          <button onClick={(e) => setFilterType(filterTypes.bandpass)}>
            band
          </button>
          <button onClick={(e) => setFilterType(filterTypes.highpass)}>
            high
          </button>
        </div>
        <input
          onChange={(e) => setFilterSlider(e.target.value)}
          type="range"
          min="0"
          max="1000"
          defaultValue={filterSlider}
          step="10"
        ></input>
        <label>Filter</label>
      </div>
      <div>
        <input
          onChange={(e) => setEnvelope_A_Slider(e.target.value)}
          type="range"
          min="0.01"
          max="1"
          defaultValue={envelope_A_Slider}
          step="0.1"
        ></input>
        <label>A</label>
        <input
          onChange={(e) => setEnvelope_D_Slider(e.target.value)}
          type="range"
          min="0"
          max="4"
          defaultValue={envelope_D_Slider}
          step="0.1"
        ></input>
        <label>D</label>
        <input
          onChange={(e) => setEnvelope_S_Slider(e.target.value)}
          type="range"
          min="0"
          max="1"
          defaultValue={envelope_S_Slider}
          step="0.1"
        ></input>
        <label>S</label>
        <input
          onChange={(e) => setEnvelope_R_Slider(e.target.value)}
          type="range"
          min="1"
          max="5"
          defaultValue={envelope_R_Slider}
          step="0.1"
        ></input>
        <label>R</label>
      </div>

      <div>
        <input
          onChange={(e) => setDelaySlider(e.target.value)}
          type="range"
          min="0"
          max="0.4"
          defaultValue={delaySlider}
          step="0.01"
        ></input>
        <label>Delay</label>
        <input
          type="checkbox"
          name="mapping"
          value={1}
          defaultChecked={keyMapping}
          onChange={toggleChecked}
        />
        <label>Mapping</label>
        <input type="checkbox" />
        <label>Darkmode</label>
      </div>
    </div>
  )
}
