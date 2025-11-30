<script setup>
import * as Tone from 'tone'

const props = defineProps({
  notes: {
    type: String,
    required: true
  }
})

const play = async () => {
  await Tone.start()
  const synth = new Tone.PolySynth(Tone.Synth).toDestination()
  const now = Tone.now()
  const notesArray = props.notes.split(',').map(n => n.trim())
  
  // Play notes for a duration of an 8th note
  synth.triggerAttackRelease(notesArray, "8n", now)
}
</script>

<template>
  <button class="btn btn-primary btn-sm" @click="play">
    <slot>Play</slot>
  </button>
</template>
