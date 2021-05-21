import React, { useState, useEffect, useContext } from "react"
import "./styles/controls.scss"
import "./styles/controls.css"
import {AudioContext} from '../context/AudioContext'
import { CircleSlider } from "react-circle-slider"
import logo from "../images/scriptwave_LOGO.png"

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
  selectedFilterType,
  setSelectedFilterType,
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
  delayFeedbackSlider,
  setDelayFeedbackSlider,
  //delayOnOff,
  setDelayOnOff,
  octaveUp,
  octaveDown,
  keyMapping,
  setKeyMapping,
  darkmode,
  setDarkmode,
}) {

    const { audio } = useContext(AudioContext)

  const root = document.documentElement
  root.style.setProperty(
    "--color__darkmode",
    darkmode ? "rgb(77, 77, 77)" : "rgb(151, 191, 201)"
  )

  const [knobColor, setKnobColor] = useState("")
  const [noiseSliderColor, setNoiseSliderColor] = useState("#79c6c3")
  const [backgroundColor, setBackgroundColor] = useState("rgb(77, 77, 77)")

  const waveformButtonsOpacity = {
    sine: 0.5,
    sawtooth: 0.5,
    triangle: 0.5,
    square: 0.5,
  }
  const [waveformButtonsOpacityOsc1, setWaveformButtonsOpacityOsc1] = useState(
    waveformButtonsOpacity
  )

  const [waveformButtonsOpacityOsc2, setWaveformButtonsOpacityOsc2] = useState(
    waveformButtonsOpacity
  )

  const [filtertypeColor, setFiltertypeColor] = useState({
    lowpass: "#ffffff",
    bandpass: "#ffffff",
    highpass: "#ffffff",
  })

  const [displayWaveform__osc1, setDisplayWaveform__osc1] = useState("unset")
  const [displayWaveform__osc2, setDisplayWaveform__osc2] = useState("none")
  const [osc1_light, setOsc1_light] = useState("visible")
  const [osc2_light, setOsc2_light] = useState("hidden")

  function toggleDarkmode() {
    if (darkmode === true) {
      setKnobColor("rgb(77, 77, 77)")
      setBackgroundColor("rgb(77, 77, 77)")
      setNoiseSliderColor("#79c6c3")
    } else {
      setKnobColor("rgb(151, 191, 201)")
      setBackgroundColor("rgb(151, 191, 201)")
      setNoiseSliderColor("#666666")
    }
  }

  function waveformButton__OpacityChange() {
    const AllWaveforms = Object.keys(waveformButtonsOpacity).map(
      (waveforms) => {
        return waveforms
      }
    )
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

  function filtertype__ColorChange() {
    const AllFilterTypes = Object.keys(filtertypeColor).map((color) => {
      return color
    })
    const nonSelectedFilterType = AllFilterTypes.filter(function (color) {
      return !selectedFilterType.includes(color)
    })

    if (selectedFilterType) {
      setFiltertypeColor({
        ...filtertypeColor,
        [selectedFilterType]: "#1a1a1a",
        [nonSelectedFilterType[0]]: "#ffffff",
        [nonSelectedFilterType[1]]: "#ffffff",
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
    setOsc1_light("visible")
    setOsc2_light("hidden")
  }

  const handleOsc_2_Volume = (osc_2_VolSlider) => {
    setOsc_2_VolSlider(osc_2_VolSlider)
    setDisplayWaveform__osc1("none")
    setDisplayWaveform__osc2("unset")
    setOsc1_light("hidden")
    setOsc2_light("visible")
  }

  const handleDetune = (osc1DetuneSlider) => {
    setOsc1DetuneSlider(osc1DetuneSlider)
  }

  const handleNoise_volume = (noiseSlider) => {
    setNoiseSlider(noiseSlider)
  }

  const handleFilter = (filterSlider) => {
    setFilterSlider(filterSlider)
  }

  const handleDelay = (delaySlider) => {
    setDelaySlider(delaySlider)
  }

  const handleDelayFeedback = (delayFeedbackSlider) => {
    setDelayFeedbackSlider(delayFeedbackSlider)
  }

  function activeOsc1() {
    setDisplayWaveform__osc1("unset")
    setDisplayWaveform__osc2("none")
    setOsc1_light("visible")
    setOsc2_light("hidden")
  }

  function activeOsc2() {
    setDisplayWaveform__osc1("none")
    setDisplayWaveform__osc2("unset")
    setOsc1_light("hidden")
    setOsc2_light("visible")
  }
console.log(delaySlider)
  useEffect(() => {
    toggleDarkmode()

    if (delaySlider == 0) {
    //   setDelayOnOff(0)
      setDelayFeedbackSlider(0)
    //disable delay or feedback
    } else {
    //   setDelayOnOff(0.2)
    }
  }, [delaySlider, toggleDarkmode])

  useEffect(() => {
    waveformButton__OpacityChange()
    filtertype__ColorChange()
  }, [waveFormOsc1, waveFormOsc2, selectedFilterType])

  return (
    <>
      <div className="controls" style={{ background: backgroundColor }}>
        <div className="controls__volume">
          <div className="controls__volume__slider">
            <CircleSlider
              value={masterVolSlider}
              size={70}
              shadow={false}
              knobColor={knobColor}
              showTooltip={true}
              showPercentage={false}
              progressColor="#f7931e"
              knobRadius={7}
              min={0}
              max={0.5}
              stepSize={0.01}
              circleColor="#f7931e;"
              tooltipSize={1}
              tooltipColor="#ff5722"
              circleWidth={0}
              progressWidth={10}
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
            <div className="controls__osc-volume__vol-sliders__osc1">
              <div
                className="controls__osc-volume__vol-sliders__osc1-light"
                style={{ visibility: osc1_light }}
              />

              <div
                className="controls__osc-volume__vol-sliders__osc1-slider"
                onClick={activeOsc1}
              >
                <CircleSlider
                  value={osc_1_VolSlider}
                  size={50}
                  shadow={false}
                  knobColor={knobColor}
                  showTooltip={true}
                  showPercentage={false}
                  progressColor="#428cc2"
                  knobRadius={5}
                  min={0}
                  max={0.5}
                  stepSize={0.01}
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
                Osc
              </label>
            </div>

            <div className="controls__osc-volume__vol-sliders__osc2">
              <div
                className="controls__osc-volume__vol-sliders__osc2-light"
                style={{ visibility: osc2_light }}
              />

              <div
                className="controls__osc-volume__vol-sliders__osc2-slider"
                onClick={activeOsc2}
              >
                <CircleSlider
                  value={osc_2_VolSlider}
                  size={50}
                  shadow={false}
                  knobColor={knobColor}
                  showTooltip={true}
                  showPercentage={false}
                  progressColor="#428cc2"
                  knobRadius={5}
                  min={0}
                  max={0.5}
                  stepSize={0.01}
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
                Osc
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
              <div
                className="controls__osc-volume__waveforms__label-wrapper__light-osc1"
                style={{ visibility: osc1_light }}
              />

              <label className="controls__osc-volume__waveforms__label-wrapper__label">
                Waveform
              </label>
              <div
                className="controls__osc-volume__waveforms__label-wrapper__light-osc2"
                style={{ visibility: osc2_light }}
              />
            </div>
          </div>
        </div>

        <div className="controls__detune-and-noise">
          <div className="controls__detune-and-noise__detune-slider">
            <CircleSlider
              value={osc1DetuneSlider}
              size={50}
              shadow={false}
              knobColor={knobColor}
              showTooltip={true}
              showPercentage={false}
              progressColor="#428cc2"
              knobRadius={5}
              min={-100}
              max={100}
              stepSize={1}
              circleColor="#ff5722"
              tooltipSize={1}
              tooltipColor="#ff5722"
              circleWidth={0}
              progressWidth={10}
              circleColor="#ff5722"
              onChange={handleDetune}
            />
          </div>
          <label className="controls__detune-and-noise__detune-label">
            Detune
          </label>
          <div
            className="controls__detune-and-noise__noise-slider"
            style={{ background: noiseSliderColor }}
          >
            <CircleSlider
              value={noiseSlider}
              size={50}
              shadow={false}
              knobColor={knobColor}
              showTooltip={true}
              showPercentage={false}
              progressColor={noiseSliderColor}
              knobRadius={5}
              min={0}
              max={1}
              stepSize={0.1}
              circleColor="#ff5722"
              tooltipSize={1}
              tooltipColor="#ff5722"
              circleWidth={0}
              progressWidth={10}
              circleColor="#ff5722"
              onChange={handleNoise_volume}
            />
          </div>

          <label
            className="controls__detune-and-noise__noise-label"
            style={{ color: noiseSliderColor }}
          >
            Noise
          </label>
        </div>
       
        <div className="controls__filter">
        <div className="controls__filter__logo">
            <img className="controls__filter__logo-img" src={logo} />
          </div>
          <div className="controls__filter__filtertype">
            <div>
              <button
                className="controls__filter__filtertype__lowpass"
                onClick={(e) => setSelectedFilterType(filterTypes.lowpass)}
                style={{ background: filtertypeColor.lowpass }}
              />
              <label className="controls__filter__filtertype__lowpass-label">
                Lp
              </label>
            </div>
            <div>
              <button
                className="controls__filter__filtertype__bandpass"
                onClick={(e) => setSelectedFilterType(filterTypes.bandpass)}
                style={{ background: filtertypeColor.bandpass }}
              />
              <label className="controls__filter__filtertype__bandpass-label">
                Bp
              </label>
            </div>
            <div>
              <button
                className="controls__filter__filtertype__highpass"
                onClick={(e) => setSelectedFilterType(filterTypes.highpass)}
                style={{ background: filtertypeColor.highpass }}
              />
              <label className="controls__filter__filtertype__highpass-label">
                Hp
              </label>
            </div>
          </div>

          <div className="controls__filter__filter-slider">
            <CircleSlider
              value={filterSlider}
              size={70}
              shadow={false}
              knobColor={knobColor}
              showTooltip={false}
              showPercentage={false}
              progressColor="#1a1a1a"
              knobRadius={7}
              min={0}
              max={10000}
              stepSize={0.1}
            //   circleColor="#ff5722"  FIX THIS FOR REST OF SLIDERS TO!!!!!!!!
            //   tooltipSize={1}
            //   tooltipColor="#ff5722"
            //   circleWidth={0}
            //   progressWidth={10}
               circleColor="#1a1a1a"
              onChange={handleFilter}
            />
          </div>
          <label className="controls__filter__label">Filter</label>
        </div>

        <div className="controls__adsr">
          <div>
            <div className="controls__adsr__attack-wrapper">
              <input
                className="controls__adsr__attack-wrapper__slider"
                onChange={(e) => setEnvelope_A_Slider(e.target.value)}
                type="range"
                min="0.001"
                max="2.001"
                defaultValue={envelope_A_Slider}
                step="0.1"
              ></input>
            </div>
            <label className="controls__adsr__attack-label">A</label>
          </div>
          <div>
            <div className="controls__adsr__decay-wrapper">
              <input
                onChange={(e) => setEnvelope_D_Slider(e.target.value)}
                type="range"
                min="0.01"
                max="1.01"
                defaultValue={envelope_D_Slider}
                step="0.1"
              ></input>
            </div>
            <label className="controls__adsr__decay-label">D</label>
          </div>

          <div>
            <div className="controls__adsr__sustain-wrapper">
              <input
                onChange={(e) => setEnvelope_S_Slider(e.target.value)}
                type="range"
                min="0"
                max="1"
                defaultValue={envelope_S_Slider}
                step="0.1"
              ></input>
            </div>
            <label className="controls__adsr__sustain-label">S</label>
          </div>

          <div>
            <div className="controls__adsr__release-wrapper">
              <input
                onChange={(e) => setEnvelope_R_Slider(e.target.value)}
                type="range"
                min="1.1"
                max="4.1"
                defaultValue={envelope_R_Slider}
                step="0.1"
              ></input>
            </div>
            <label className="controls__adsr__release-label">R</label>
          </div>
        </div>

        <div className="controls__delay">
          <div className="controls__delay__MIDI">
            <label className="controls__delay__MIDI__label">MIDI</label>
            <div className="controls__delay__MIDI__light"></div>
          </div>
          <div className="controls__delay__headline">Delay</div>
          <div className="controls__delay__sliders">
         
          <div>
            
             
            <div className="controls__delay__sliders__slider-time">
              <CircleSlider
                value={delaySlider}
                size={45}
                shadow={false}
                knobColor={knobColor}
                showTooltip={true}
                showPercentage={false}
                progressColor="#d8d6d6"
                knobRadius={4.5}
                min={0}
                max={1}
                stepSize={0.1}
                circleColor="#ff5722"
                tooltipSize={1}
                tooltipColor="#ff5722"
                circleWidth={0}
                progressWidth={10}
                circleColor="#ff5722"
              
                onChange={handleDelay}
              />
            </div>
            <label className="controls__delay__sliders__label-time">Time</label>
          </div>
          <div>
            <div className="controls__delay__sliders__slider-repeat">
              <CircleSlider
                value={delayFeedbackSlider}
                size={45}
                shadow={false}
                knobColor={knobColor}
                showTooltip={false}
                showPercentage={false}
                progressColor="#d8d6d6"
                knobRadius={4.5}
                min={0}
                max={0.9}
                stepSize={0.1}
          
                tooltipSize={1}
                // tooltipColor="#ff5722"
                circleWidth={0}
                progressWidth={10}
                // circleColor="#ff5722"
                onChange={handleDelayFeedback}
              />
            </div>
            <label className="controls__delay__sliders__label-repeat">Repeat</label>
          </div>
          </div>
          <div className="controls__delay__switches">
            <div>
              <label className="controls__delay__switches__keymapping">
                <input
                  type="checkbox"
                  value={1}
                  defaultChecked={keyMapping}
                  onChange={toggleCheckedKeyMapping}
                />
                <div className="controls__delay__switches__keymapping-slider"></div>
              </label>

              <div className="controls__delay__switches__keymapping-label">
                Mapping
              </div>
            </div>
            <div>
              <label className="controls__delay__switches__darkmode">
                <input
                  type="checkbox"
                  value={1}
                  defaultChecked={darkmode}
                  onChange={toggleCheckedDarkmode}
                />
                <div className="controls__delay__switches__darkmode-slider"></div>
              </label>

              <div className="controls__delay__switches__darkmode-label">
                Darkmode
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
