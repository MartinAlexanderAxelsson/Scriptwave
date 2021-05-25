import React, { useContext, useEffect, useState } from "react"
import { useMIDI, useMIDINote } from "@react-midi/hooks"
import { AudioContext } from "../context/AudioContext"
// import {MIDI_notes} from '../components/note_frequencies'
export default function MIDI({
  MIDI_notes,
  oscillator_1,
  oscillator_2,
  whiteNoise,
  key,

  setMIDI_connected,
  MIDI_connected,
  setMIDI_alert_message,
  setUser_interaction_message,
  check_user_interaction,
  keyClassNames,
  setKeyClassNames,
}) {
  //   var midi

  const { audio } = useContext(AudioContext)

  //   // request MIDI access
  //   if (navigator.requestMIDIAccess) {
  //     navigator
  //       .requestMIDIAccess({
  //         sysex: false,
  //       })
  //       .then(onMIDISuccess, onMIDIFailure)
  //   } else {
  //     alert("No MIDI support in your browser.")
  //   }

  //   // midi functions
  //   function onMIDISuccess(midiAccess) {
  //     midi = midiAccess
  //     var inputs = midi.inputs.values()
  //     // loop through all inputs
  //     for (
  //       var input = inputs.next();
  //       input && !input.done;
  //       input = inputs.next()
  //     ) {
  //       // listen for midi messages
  //       input.value.onmidimessage = onMIDIMessage
  //       // this just lists our inputs in the console
  //       listInputs(input)
  //     }
  //     // listen for connect/disconnect message
  //     midi.onstatechange = onStateChange
  //   }

  //   function onMIDIMessage(event) {
  //     let data = event.data,
  //       cmd = data[0] >> 4,
  //       channel = data[0] & 0xf,
  //       type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
  //       note = data[1],
  //       velocity = data[2]

  //     // with pressure and tilt off
  //     // note off: 128, cmd: 8
  //     // note on: 144, cmd: 9
  //     // pressure / tilt on
  //     // pressure: 176, cmd 11:
  //     // bend: 224, cmd: 14

  //     // if (type === 144) {
  //     //     play_MIDI_Note(note)
  //     // }

  //     // if (type === 128) {
  //     //     return false
  //     // }
  //     switch (type) {
  //       case 144: // noteOn meddelande
  //         play_MIDI_Note(note)
  //         break
  //       case 128: // noteOff meddelande
  //         break
  //     }

  //     //console.log('data', data, 'cmd', cmd, 'channel', channel);
  //     console.log(type)
  //   }

  //   function onStateChange(event, MIDI_connected) {
  //     var port = event.port,
  //       state = port.state,
  //       name = port.name,
  //       type = port.type
  //     // if (type == "input") console.log("name", name, "port", port, "state", state)

  //     if (state === "connected") {
  //       setMIDI_connected(true)
  //     } else {
  //       setMIDI_connected(false)
  //     }
  //   }

  //   function listInputs(inputs) {
  //     var input = inputs.value

  //     console.log(
  //       "Input port : [ type:'" +
  //         input.type +
  //         "' id: '" +
  //         input.id +
  //         "' manufacturer: '" +
  //         input.manufacturer +
  //         "' name: '" +
  //         input.name +
  //         "' version: '" +
  //         input.version +
  //         "']"
  //     )
  //   }

  //   function play_MIDI_Note(note) {
  //     audio.resume()
  //     let MIDI_note_pressed = "key" + note

  //     oscillator_1((key = MIDI_notes[MIDI_note_pressed]))
  //     oscillator_2((key = MIDI_notes[MIDI_note_pressed]))
  //     whiteNoise()
  //   }

  //   function noteOff() {
  //     audio.suspend()
  //     console.log("off")
  //   }
  //   function onMIDIFailure(e) {
  //     console.log(
  //       "No access to MIDI devices or your browser doesn't support WebMIDI API" +
  //         e
  //     )
  //   }

  //41-83
  //   const [f, setF] = useState(349.228)
  //   const [gb, setGb] = useState(369.994)
  //   const [g, setG] = useState(391.995)
  //   const [ab, setAb] = useState(415.305)
  //   const [a, setA] = useState(440)
  //   const [bb, setBb] = useState(466.164)
  //   const [b, setB] = useState(493.883)
  //   const [c, setC] = useState(523.251)
  //   const [db, setDb] = useState(554.365)
  //   const [d, setD] = useState(587.33)
  //   const [eb, setEb] = useState(622.254)
  //   const [e, setE] = useState(659.255)
  //   const [f2, setF2] = useState(698.456)
  //   const [gb2, setGb2] = useState(739.989)
  //   const [g2, setG2] = useState(783.991)
  //   const [ab2, setAb2] = useState(830.609)
  //   const [a2, setA2] = useState(880)
  //   const [bb2, setBb2] = useState(932.328)
  //   const [b2, setB2] = useState(987.767)

  //   const MIDI_notes = {
  //     key41: 'key41',
  //     key42: 'key42',
  //     key43: 'key43',
  //     key44: 'key44',
  //     key45: 'key45',
  //     key46: 'key46',
  //     key47: 'key47',
  //     key48: 'key48',
  //     key49: 'key49',
  //     key50: 'key50',
  //     key51: 'key51',
  //     key52: 'key52',
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
  //     key72: 'key72',
  //     key73: 'key73',
  //     key74: 'key74',
  //     key75: 'key75',
  //     key76: 'key76',
  //     key77: 'key77',
  //     key78: 'key78',
  //     key79: 'key79',
  //     key80: 'key80',
  //     key81: 'key81',
  //     key82: 'key82',
  //     key83: 'key82',
  //   }

  const { inputs, outputs, hasMIDI } = useMIDI()

  const input = inputs[0]

  if (!hasMIDI) {
    setMIDI_alert_message("unset")
  }
  if (input) {
    if (input.state === "connected") {
      setMIDI_connected(true)
      if (check_user_interaction === false) {
        setUser_interaction_message("unset")
      } else {
        setUser_interaction_message("none")
      }
    }
  }

  if (!input) {
    setMIDI_connected(false)
  }

  const event = useMIDINote(input, { channel: 0 }) // Intially returns undefined

  function play_MIDI_Note() {
    let MIDI_note_pressed = "key" + event.note
    const allKeys = Object.keys(MIDI_notes).map((allKeys) => {
      return allKeys
    })
    console.log(MIDI_note_pressed)
    const match = allKeys.find((e) => e === MIDI_note_pressed)

    //   if (match) {
    //     oscillator_1((key = MIDI_notes[MIDI_note_pressed]))
    //     oscillator_2((key = MIDI_notes[MIDI_note_pressed]))
    //     whiteNoise()
    //     if (
    //       keyClassNames[MIDI_notes[MIDI_note_pressed]] ==
    //       `${MIDI_notes[MIDI_note_pressed]}-hit`
    //     ) {
    //       setKeyClassNames({
    //         ...keyClassNames,
    //         [MIDI_notes[
    //           MIDI_note_pressed
    //         ]]: `${MIDI_notes[MIDI_note_pressed]}-hit2`,
    //       })
    //     } else {
    //       setKeyClassNames({
    //         ...keyClassNames,
    //         [MIDI_notes[
    //           MIDI_note_pressed
    //         ]]: `${MIDI_notes[MIDI_note_pressed]}-hit`,
    //       })
    //     }
    //   }

    oscillator_1((key = MIDI_note_pressed))
    oscillator_2((key = MIDI_note_pressed))
    whiteNoise()

    if (MIDI_note_pressed > 'key' + 53 || MIDI_note_pressed < 'key' + 72) {
      if (
        keyClassNames[MIDI_notes[MIDI_note_pressed][1]] ==
        `${MIDI_notes[MIDI_note_pressed][1]}-hit`
      ) {
        setKeyClassNames({
          ...keyClassNames,
          [MIDI_notes[
            MIDI_note_pressed
          ][1]]: `${MIDI_notes[MIDI_note_pressed][1]}-hit2`,
        })
      } else {
        setKeyClassNames({
          ...keyClassNames,
          [MIDI_notes[
            MIDI_note_pressed
          ][1]]: `${MIDI_notes[MIDI_note_pressed][1]}-hit`,
        })
      }
    }
  }
  // console.log(inputs[0].state)

  if (event) {
    if (event.on === true) {
      play_MIDI_Note()

      return (event.on = false)
    }
  }

  return <div></div>
}
