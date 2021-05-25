import React, { useState, useEffect, useContext } from "react"
import "./styles/keyboard.css"
import { AudioContext } from "../context/AudioContext"

export default function Keyboard({
  notes,
  waveForms,
  oscillator_1,
  oscillator_2,
  whiteNoise,
  key,
  keyMapping,
  darkmode,
  keyClassNames,
  setKeyClassNames,
}) {
  const { audio } = useContext(AudioContext)
  const root = document.documentElement
  root.style.setProperty(
    "--background-color__keyboard",
    darkmode ? "rgb(77, 77, 77)" : "rgb(151, 191, 201)"
  )
  root.style.setProperty(
    "--background-color__blackkeys",
    darkmode ? "rgb(77, 77, 77)" : "rgb(151, 191, 201)"
  )
  root.style.setProperty(
    "--border__whitekeys",
    darkmode ? "3px solid rgb(77, 77, 77)" : "3px solid rgb(151, 191, 201)"
  )
  root.style.setProperty(
    "--color__keymapping__whitekeys",
    darkmode ? "rgb(77, 77, 77)" : "rgb(151, 191, 201)"
  )
  root.style.setProperty(
    "--background-color__keyHit__whitekeys",
    darkmode ? "rgb(251, 176, 59)" : "rgb(194, 243, 148)"
  )
  root.style.setProperty(
    "--background-color__keyHit2__whitekeys",
    darkmode ? "rgb(250, 116, 39)" : "rgb(255, 219, 99)"
  )

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

      if (keyClassNames[pressedKey] == `${pressedKey}-hit`) {
        setKeyClassNames({
          ...keyClassNames,
          [pressedKey]: `${pressedKey}-hit2`,
        })
      } else {
        setKeyClassNames({
          ...keyClassNames,
          [pressedKey]: `${pressedKey}-hit`,
        })
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", listenerKeyDown)
    return () => {
      window.removeEventListener("keydown", listenerKeyDown)
    }
  }, [waveForms, keyClassNames])

  return (
    <>
      <div className="keyboard">
        <div className="keyboard__white-key__wrapper">
          <button
            className={keyClassNames.KeyA}
            onClick={(e) => playNote((key = "KeyA"))}
          >
            <div className={keyMapping.white}>A</div>
          </button>
          <button
            className={keyClassNames.KeyS}
            onClick={(e) => playNote((key = "KeyS"))}
          >
            <div className={keyMapping.white}>S</div>
          </button>
          <button
            className={keyClassNames.KeyD}
            onClick={(e) => playNote((key = "KeyD"))}
          >
            <div className={keyMapping.white}>D</div>
          </button>
          <button
            className={keyClassNames.KeyF}
            onClick={(e) => playNote((key = "KeyF"))}
          >
            <div className={keyMapping.white}>F</div>
          </button>
          <button
            className={keyClassNames.KeyG}
            onClick={(e) => playNote((key = "KeyG"))}
          >
            <div className={keyMapping.white}>G</div>
          </button>
          <button
            className={keyClassNames.KeyH}
            onClick={(e) => playNote((key = "KeyH"))}
          >
            <div className={keyMapping.white}>H</div>
          </button>
          <button
            className={keyClassNames.KeyJ}
            onClick={(e) => playNote((key = "KeyJ"))}
          >
            <div className={keyMapping.white}>J</div>
          </button>
          <button
            className={keyClassNames.KeyK}
            onClick={(e) => playNote((key = "KeyK"))}
          >
            <div className={keyMapping.white}>K</div>
          </button>
          <button
            className={keyClassNames.KeyL}
            onClick={(e) => playNote((key = "KeyL"))}
          >
            <div className={keyMapping.white}>L</div>
          </button>
          <button
            className={keyClassNames.Semicolon}
            onClick={(e) => playNote((key = "Semicolon"))}
          >
            <div className={keyMapping.white}>Ö</div>
          </button>
          <button
            className={keyClassNames.Quote}
            onClick={(e) => playNote((key = "Quote"))}
          >
            <div className={keyMapping.white}>Ä</div>
          </button>
        </div>
        {/* <div className="keyboard__black-key__wrapper"> */}
        <button
          className={keyClassNames.KeyW}
          onClick={(e) => playNote((key = "KeyW"))}
        >
          <div className={keyMapping.black}>W</div>
        </button>
        <button
          className={keyClassNames.KeyE}
          onClick={(e) => playNote((key = "KeyE"))}
        >
          <div className={keyMapping.black}>E</div>
        </button>
        <button
          className={keyClassNames.KeyR}
          onClick={(e) => playNote((key = "KeyR"))}
        >
          <div className={keyMapping.black}>R</div>
        </button>
        <button
          className={keyClassNames.KeyY}
          onClick={(e) => playNote((key = "KeyY"))}
        >
          <div className={keyMapping.black}>Y</div>
        </button>
        <button
          className={keyClassNames.KeyU}
          onClick={(e) => playNote((key = "KeyU"))}
        >
          <div className={keyMapping.black}>U</div>
        </button>
        <button
          className={keyClassNames.KeyO}
          onClick={(e) => playNote((key = "KeyO"))}
        >
          <div className={keyMapping.black}>O</div>
        </button>
        <button
          className={keyClassNames.KeyP}
          onClick={(e) => playNote((key = "KeyP"))}
        >
          <div className={keyMapping.black}>P</div>
        </button>
        <button
          className={keyClassNames.BracketLeft}
          onClick={(e) => playNote((key = "BracketLeft"))}
        >
          <div className={keyMapping.black}>Å</div>
        </button>
        {/* </div> */}
      </div>
    </>
  )
}
