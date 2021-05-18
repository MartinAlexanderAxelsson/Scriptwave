import React, { useState, useEffect } from "react"
import "./controls.scss"
import { CircleSlider } from "react-circle-slider"
export default function Controls({
  masterVolSlider,
  setMasterVolSlider,
  waveForms,
  setWaveFormOsc1,
  setWaveFormOsc2,
  waveFormOsc1,
  waveFormOsc2,
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
  darkmode,
  setDarkmode,
}) {
  const [knobColor, setKnobColor] = useState("")

const waveformButtonsOpacity ={
    sine: 0.5,
    sawtooth: 0.5,
    triangle: 0.5,
    square: 0.5,
  }
  const [waveformButtonsOpacityOsc1, setWaveformButtonsOpacityOsc1] = useState(waveformButtonsOpacity)

  const [waveformButtonsOpacityOsc2, setWaveformButtonsOpacityOsc2] = useState(waveformButtonsOpacity)

  const [displayWaveform__osc1, setDisplayWaveform__osc1] = useState("unset")
  const [displayWaveform__osc2, setDisplayWaveform__osc2] = useState("none")

  function toggleDarkmode() {
    if (darkmode === true) {
      setKnobColor("rgb(77, 77, 77)")
    } else {
      setKnobColor("rgb(151, 191, 201)")
    }
  }

  function handleOpacity() {
    const AllWaveforms = Object.keys(waveformButtonsOpacity).map((waveforms) => {
      return waveforms
    })
    const nonSelectedWaveformsOsc1 = AllWaveforms.filter(function (waveform) {
      return !waveFormOsc1.includes(waveform)
    })
    const nonSelectedWaveformsOsc2 = AllWaveforms.filter(function (waveform) {
        return !waveFormOsc2.includes(waveform)
      })
    if (waveFormOsc1) {
      setWaveformButtonsOpacityOsc1({
        ...waveformButtonsOpacityOsc1,
        [waveFormOsc1]: 1,
        [nonSelectedWaveformsOsc1[0]]: 0.5,
        [nonSelectedWaveformsOsc1[1]]: 0.5,
        [nonSelectedWaveformsOsc1[2]]: 0.5,
      })
    }

    if (waveFormOsc2) {
        setWaveformButtonsOpacityOsc2({
          ...waveformButtonsOpacityOsc2,
          [waveFormOsc2]: 1,
          [nonSelectedWaveformsOsc2[0]]: 0.5,
          [nonSelectedWaveformsOsc2[1]]: 0.5,
          [nonSelectedWaveformsOsc2[2]]: 0.5,
        })
      }
  }

  function toggleCheckedKeyMapping() {
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

  const toggleCheckedDarkmode = () => setDarkmode((checked) => !checked)

  const handleMasterVolume = (masterVolSlider) => {
    setMasterVolSlider(masterVolSlider)
  }

  const handleOsc_1_Volume = (osc_1_VolSlider) => {
    setOsc_1_VolSlider(osc_1_VolSlider)
    setDisplayWaveform__osc1("unset")
    setDisplayWaveform__osc2("none")
  }

  const handleOsc_2_Volume = (osc_2_VolSlider) => {
    setOsc_2_VolSlider(osc_2_VolSlider)
    setDisplayWaveform__osc1("none")
    setDisplayWaveform__osc2("unset")
  }

  function activeOsc1() {
    setDisplayWaveform__osc1("unset")
    setDisplayWaveform__osc2("none")
  }

  function activeOsc2() {
    setDisplayWaveform__osc1("none")
    setDisplayWaveform__osc2("unset")
  }

  useEffect(() => {
    toggleDarkmode()

    if (delaySlider == 0) {
      setDelayOnOff(0)
    } else {
      setDelayOnOff(0.2)
    }
  }, [delaySlider, toggleDarkmode])

  useEffect(() => {
    handleOpacity()
  }, [waveFormOsc1, waveFormOsc2])

  return (
    <>
      <div className="controls">
        <div className="controls__volume">
          <div className="controls__volume__slider">
            <CircleSlider
              value={masterVolSlider}
              size={100}
              shadow={false}
              knobColor={knobColor}
              showTooltip={true}
              showPercentage={false}
              progressColor="#FDB11B"
              knobRadius={8}
              min={0}
              max={1}
              stepSize={0.1}
              circleColor="#ff5722"
              tooltipSize={1}
              tooltipColor="#ff5722"
              circleWidth={0}
              progressWidth={10}
              circleColor="#ff5722"
              onChange={handleMasterVolume}
            />
          </div>
          <label className="controls__volume__label">Volume</label>
          <div className="controls__volume__octBtn-wrapper">
            <button
              className="controls__volume__octBtn-wrapper__btnDown"
              onClick={octaveDown}
            ></button>
            <button
              className="controls__volume__octBtn-wrapper__btnUp"
              onClick={octaveUp}
            ></button>
          </div>
          <label className="controls__volume__octBtn-wrapper__label">
            Octave
          </label>
        </div>

        {/* ------------------------------------------ */}

        <div className="controls__osc-volume">
          <div className="controls__osc-volume__vol-sliders">
            <div>
              <div className="controls__osc-volume__vol-sliders__osc1-light">
                light
              </div>
              <div
                className="controls__osc-volume__vol-sliders__osc1"
                onClick={activeOsc1}
              >
                <CircleSlider
                  value={osc_1_VolSlider}
                  size={70}
                  shadow={false}
                  knobColor={knobColor}
                  showTooltip={true}
                  showPercentage={false}
                  progressColor="#428cc2"
                  knobRadius={6}
                  min={0}
                  max={1}
                  stepSize={0.1}
                  circleColor="#ff5722"
                  tooltipSize={1}
                  tooltipColor="#ff5722"
                  circleWidth={0}
                  progressWidth={10}
                  circleColor="#ff5722"
                  onChange={handleOsc_1_Volume}
                />
              </div>
              <label className="controls__osc-volume__vol-sliders__label-osc1">
                Osc1
              </label>
            </div>

            <div>
              <div className="controls__osc-volume__vol-sliders__osc2-light">
                light
              </div>
              <div
                className="controls__osc-volume__vol-sliders__osc2"
                onClick={activeOsc2}
              >
                <CircleSlider
                  value={osc_2_VolSlider}
                  size={70}
                  shadow={false}
                  knobColor={knobColor}
                  showTooltip={true}
                  showPercentage={false}
                  progressColor="#428cc2"
                  knobRadius={6}
                  min={0}
                  max={1}
                  stepSize={0.1}
                  circleColor="#ff5722"
                  tooltipSize={1}
                  tooltipColor="#ff5722"
                  circleWidth={0}
                  progressWidth={10}
                  circleColor="#ff5722"
                  onChange={handleOsc_2_Volume}
                />
              </div>
              <label className="controls__osc-volume__vol-sliders__label-osc2">
                Osc2
              </label>
            </div>
          </div>

          <div className="controls__osc-volume__waveforms">
            <div
              className="controls__osc-volume__waveforms__osc1"
              style={{ display: displayWaveform__osc1 }}
            >
              <button
                className="controls__osc-volume__waveforms__osc1__sinBtn"
                onClick={(e) => setWaveFormOsc1(waveForms.sine)}
                style={{ opacity: waveformButtonsOpacityOsc1.sine }}
              />
              <button
                className="controls__osc-volume__waveforms__osc1__sawBtn"
                onClick={(e) => setWaveFormOsc1(waveForms.sawtooth)}
                style={{ opacity: waveformButtonsOpacityOsc1.sawtooth }}
              />
              <button
                className="controls__osc-volume__waveforms__osc1__sqrBtn"
                onClick={(e) => setWaveFormOsc1(waveForms.square)}
                style={{ opacity: waveformButtonsOpacityOsc1.square }}
              />
              <button
                className="controls__osc-volume__waveforms__osc1__triBtn"
                onClick={(e) => setWaveFormOsc1(waveForms.triangle)}
                style={{ opacity: waveformButtonsOpacityOsc1.triangle }}
              />
            </div>
            <div
              className="controls__osc-volume__waveforms__osc2"
              style={{ display: displayWaveform__osc2 }}
            >
              <button
                className="controls__osc-volume__waveforms__osc2__sinBtn"
                onClick={(e) => setWaveFormOsc2(waveForms.sine)}
                style={{ opacity: waveformButtonsOpacityOsc2.sine }}
              />
              <button
                className="controls__osc-volume__waveforms__osc2__sawBtn"
                onClick={(e) => setWaveFormOsc2(waveForms.sawtooth)}
                style={{ opacity: waveformButtonsOpacityOsc2.sawtooth }}
              />
              <button
                className="controls__osc-volume__waveforms__osc2__sqrBtn"
                onClick={(e) => setWaveFormOsc2(waveForms.square)}
                style={{ opacity: waveformButtonsOpacityOsc2.square }}
              />
              <button
                className="controls__osc-volume__waveforms__osc2__triBtn"
                onClick={(e) => setWaveFormOsc2(waveForms.triangle)}
                style={{ opacity: waveformButtonsOpacityOsc2.triangle }}
              />
            </div>
            <div className="controls__osc-volume__waveforms__label-wrapper">
              <div className="controls__osc-volume__waveforms__label-wrapper__light-osc1">
                light
              </div>
              <label className="controls__osc-volume__waveforms__label-wrapper__label">
                Waveform
              </label>
              <div className="controls__osc-volume__waveforms__label-wrapper__light-osc2">
                light
              </div>
            </div>
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
            onChange={toggleCheckedKeyMapping}
          />
          <label>Mapping</label>
          <input
            type="checkbox"
            name="mapping"
            value={1}
            defaultChecked={darkmode}
            onChange={toggleCheckedDarkmode}
          />
          <label>Darkmode</label>
        </div>
      </div>
    </>
  )
}
