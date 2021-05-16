import React, { useState, useEffect } from "react"
import "./keyboard.scss"

export default function Keyboard({
  notes,
  waveForms,
  oscillator_1,
  oscillator_2,
  whiteNoise,
  key,
  keyMapping
}) {


  const [className, setClassName] = useState({
    KeyA: "KeyA",
    KeyW: "KeyW",
    KeyS: "KeyS",
    KeyE: "KeyE",
    KeyD: "KeyD",
    KeyR: "KeyR",
    KeyF: "KeyF",
    KeyG: "KeyG",
    KeyY: "KeyY",
    KeyH: "KeyH",
    KeyU: "KeyU",
    KeyJ: "KeyJ",
    KeyK: "KeyK",
    KeyO: "KeyO",
    KeyL: "KeyL",
    KeyP: "KeyP",
    Semicolon: "Semicolon",
    BracketLeft: "BracketLeft",
    Quote: "Quote",
  })

  function playNote() {
    oscillator_1(key)
    oscillator_2(key)
    whiteNoise()
  }

  const listenerKeyDown = (event) => {
    const pressedKey = event.code

    const allKeys = Object.keys(notes).map((allKeys) => {
      return allKeys
    })

    const match = allKeys.find((e) => e === pressedKey)

    if (match) {
      if (event.repeat) return

      playNote((key = pressedKey))

      if (className[pressedKey] == `${pressedKey}-hit`) {
        setClassName({ ...className, [pressedKey]: `${pressedKey}-hit2` })
      } else {
        setClassName({ ...className, [pressedKey]: `${pressedKey}-hit` })
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", listenerKeyDown)

    return () => {
      window.removeEventListener("keydown", listenerKeyDown)
    }
  }, [waveForms, className])
  return (
    <>
      <div className="keyboard">
        <div className="keyboard__white-key__wrapper">
          <button
            className={className.KeyA}
            onClick={(e) => playNote((key = "KeyA"))}
          >
            <div className={keyMapping.white}>A</div>
          </button>
          <button
            className={className.KeyS}
            onClick={(e) => playNote((key = "KeyS"))}
          >
            <div className={keyMapping.white}>S</div>
          </button>
          <button
            className={className.KeyD}
            onClick={(e) => playNote((key = "KeyD"))}
          >
            <div className={keyMapping.white}>D</div>
          </button>
          <button
            className={className.KeyF}
            onClick={(e) => playNote((key = "KeyF"))}
          >
            <div className={keyMapping.white}>F</div>
          </button>
          <button
            className={className.KeyG}
            onClick={(e) => playNote((key = "KeyG"))}
          >
            <div className={keyMapping.white}>G</div>
          </button>
          <button
            className={className.KeyH}
            onClick={(e) => playNote((key = "KeyH"))}
          >
            <div className={keyMapping.white}>H</div>
          </button>
          <button
            className={className.KeyJ}
            onClick={(e) => playNote((key = "KeyJ"))}
          >
            <div className={keyMapping.white}>J</div>
          </button>
          <button
            className={className.KeyK}
            onClick={(e) => playNote((key = "KeyK"))}
          >
            <div className={keyMapping.white}>K</div>
          </button>
          <button
            className={className.KeyL}
            onClick={(e) => playNote((key = "KeyL"))}
          >
            <div className={keyMapping.white}>L</div>
          </button>
          <button
            className={className.Semicolon}
            onClick={(e) => playNote((key = "Semicolon"))}
          >
            <div className={keyMapping.white}>Ö</div>
          </button>
          <button
            className={className.Quote}
            onClick={(e) => playNote((key = "Quote"))}
          >
            <div className={keyMapping.white}>Ä</div>
          </button>
        </div>
        {/* <div className="keyboard__black-key__wrapper"> */}
        <button
          className={className.KeyW}
          onClick={(e) => playNote((key = "KeyW"))}
        >
          <div className={keyMapping.black}>W</div>
        </button>
        <button
          className={className.KeyE}
          onClick={(e) => playNote((key = "KeyE"))}
        >
          <div className={keyMapping.black}>E</div>
        </button>
        <button
          className={className.KeyR}
          onClick={(e) => playNote((key = "KeyR"))}
        >
          <div className={keyMapping.black}>R</div>
        </button>
        <button
          className={className.KeyY}
          onClick={(e) => playNote((key = "KeyY"))}
        >
          <div className={keyMapping.black}>Y</div>
        </button>
        <button
          className={className.KeyU}
          onClick={(e) => playNote((key = "KeyU"))}
        >
          <div className={keyMapping.black}>U</div>
        </button>
        <button
          className={className.KeyO}
          onClick={(e) => playNote((key = "KeyI"))}
        >
          <div className={keyMapping.black}>O</div>
        </button>
        <button
          className={className.KeyP}
          onClick={(e) => playNote((key = "KeyP"))}
        >
          <div className={keyMapping.black}>P</div>
        </button>
        <button
          className={className.BracketLeft}
          onClick={(e) => playNote((key = "BracketLeft"))}
        >
          <div className={keyMapping.black}>Å</div>
        </button>
        {/* </div> */}
      </div>
    </>
  )
}
