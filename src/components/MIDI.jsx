import React, { useContext, useEffect, useState } from "react"
import { AudioContext } from "../context/AudioContext"
export default function MIDI({
  MIDI_notes,
  oscillator_1,
  oscillator_2,
  whiteNoise,
  key,
  waveForms,
  
}) {
  
    var midi


   const { audio } = useContext(AudioContext)

  // request MIDI access
  if (navigator.requestMIDIAccess) {
    navigator
      .requestMIDIAccess({
        sysex: false,
      })
      .then(onMIDISuccess, onMIDIFailure)
  } else {
    alert("No MIDI support in your browser.")
  }

  // midi funktioner
  function onMIDISuccess(midiAccess) {
    midi = midiAccess
    var inputs = midi.inputs.values()
    // loopa genom alla inputs
    for (
      var input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      // listen efter midi meddelanden
      input.value.onmidimessage = onMIDIMessage
      // lista inputs i consolen
      listInputs(input)
    }
    // lyssna efter connect/disconnect meddelande
    midi.onstatechange = onStateChange
  }

  function onMIDIMessage(event) {
    let data = event.data,
      cmd = data[0] >> 4,
      channel = data[0] & 0xf,
      type = data[0] & 0xf0,
      note = data[1],
      velocity = data[2]
  
  
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14

    switch (type) {
      case 144: // noteOn meddelande
        play_MIDI_Note(note)
        break
    //   case 128: // noteOff meddelande
    //     play_MIDI_Note(velocity)
    //     break
    }

    //console.log('data', data, 'cmd', cmd, 'channel', channel);
    console.log(event.timeStamp)
    
  }

  function onStateChange(event) {
    var port = event.port,
      state = port.state,
      name = port.name,
      type = port.type
    if (type == "input") console.log("name", name, "port", port, "state", state)
  }

  function listInputs(inputs) {
    var input = inputs.value
    console.log(
      "Input port : [ type:'" +
        input.type +
        "' id: '" +
        input.id +
        "' manufacturer: '" +
        input.manufacturer +
        "' name: '" +
        input.name +
        "' version: '" +
        input.version +
        "']"
    )
  }
  
  function play_MIDI_Note(note) {

    let MIDI_note_pressed = "key" + note

    oscillator_1((key = MIDI_notes[MIDI_note_pressed]))
    oscillator_2((key = MIDI_notes[MIDI_note_pressed]))
    whiteNoise()
  
  }


  function onMIDIFailure(e) {
    console.log(
      "No access to MIDI devices or your browser doesn't support WebMIDI API" +
        e
    )
  }

  return <div></div>
}
