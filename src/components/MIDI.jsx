import React, { useContext, useEffect, useState } from "react"
import { useMIDI, useMIDINote } from "@react-midi/hooks"
import { AudioContext } from "../context/AudioContext"

export default function MIDI({
  //   MIDI_notes,
  oscillator_1,
  oscillator_2,
  whiteNoise,
  key,
  setMIDI_connected,
  MIDI_connected,
  setMIDI_alert_message,
  setUser_interaction_message, 
  check_user_interaction
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

  const MIDI_notes = {
    key53: "KeyA",
    key54: "KeyW",
    key55: "KeyS",
    key56: "KeyE",
    key57: "KeyD",
    key58: "KeyR",
    key59: "KeyF",
    key60: "KeyG",
    key61: "KeyY",
    key62: "KeyH",
    key63: "KeyU",
    key64: "KeyJ",
    key65: "KeyK",
    key66: "KeyO",
    key67: "KeyL",
    key68: "KeyP",
    key69: "Semicolon",
    key70: "BracketLeft",
    key71: "Quote",
  }

  const { inputs, outputs, hasMIDI } = useMIDI()

  const input = inputs[0]

  if (!hasMIDI) {
    setMIDI_alert_message("unset")
  }
  if (input) {

    if (input.state === "connected") {
      setMIDI_connected(true)
      if (check_user_interaction === false) {
        setUser_interaction_message('unset')
      } else {
        setUser_interaction_message('none')
      }
    
    }
  }

  if (!input) {
    setMIDI_connected(false)
  }

  const event = useMIDINote(input, { channel: 0 }) // Intially returns undefined

  function play_MIDI_Note() {
   
    let MIDI_note_pressed = "key" + event.note

    oscillator_1((key = MIDI_notes[MIDI_note_pressed]))
    oscillator_2((key = MIDI_notes[MIDI_note_pressed]))
    whiteNoise()
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
