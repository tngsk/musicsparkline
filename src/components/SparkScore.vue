<script setup>
import { onMounted, ref, watch } from "vue";
import * as VexFlow from "vexflow";

const props = defineProps({
    notes: { type: String, required: true },
    timeSignature: { type: String, default: "4/4" },
    clef: { type: String, default: "treble" },
    showTimeSignature: { type: Boolean, default: false },
});

const container = ref(null);

const render = () => {
    if (!container.value) return;

    try {
        container.value.innerHTML = "";

        const { Factory, Renderer, Stave, StaveNote, Voice, Formatter, Accidental } =
            VexFlow;

        const noteGroups = props.notes.split(",");
        const noteCount = noteGroups.length;
        const width = Math.max(150, noteCount * 40 + (props.showTimeSignature ? 100 : 60));

        const vf = new Factory({
            renderer: {
                elementId: container.value,
                backend: Renderer.Backends.SVG,
                width: width,
                height: 120, // Reduced height for inline
            },
        });

        const context = vf.getContext();
        const stave = new Stave(10, 10, width - 20);
        stave.addClef(props.clef);
        if (props.showTimeSignature) {
            stave.addTimeSignature(props.timeSignature);
        }
        stave.setContext(context).draw();

        const vfNotes = noteGroups.map((noteGroupStr) => {
            // Check for duration at the end of the group (e.g. C4+E4+G4/h)
            const [pitchesStr, duration = "q"] = noteGroupStr.trim().split("/");
            const pitches = pitchesStr.split("+").map(p => p.trim());

            const keys = [];
            const accidentals = [];

            pitches.forEach((pitchStr, index) => {
                const pitchMatch = pitchStr.match(/^([A-Ga-g])([#b]?)(\d+)$/i);
                if (pitchMatch) {
                    const [, note, accidental, octave] = pitchMatch;
                    keys.push(`${note.toLowerCase()}${accidental}/${octave}`);
                    if (accidental) {
                         accidentals.push({ index, type: accidental });
                    }
                } else {
                     keys.push("c/4");
                }
            });

            const staveNote = new StaveNote({
                keys: keys,
                duration: duration,
                auto_stem: true,
                clef: props.clef
            });

            accidentals.forEach(acc => {
                staveNote.addModifier(new Accidental(acc.type), acc.index);
            });

            return staveNote;
        });

        const [numBeats, beatValue] = props.timeSignature
            .split("/")
            .map(Number);
        const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
        voice.setStrict(false);
        voice.addTickables(vfNotes);

        new Formatter().joinVoices([voice]).format([voice], width - 40);
        voice.draw(context, stave);

        const svg = container.value.querySelector("svg");
        if (svg) {
            svg.style.cssText = "height: 4em; width: auto; display: inline-block; vertical-align: middle;";
            svg.setAttribute("viewBox", `0 0 ${width} 120`);
            svg.querySelectorAll("*").forEach((el) => {
                if (el.tagName !== "svg")
                    el.style.cssText = "fill: black; stroke: black;";
            });
        }
    } catch (error) {
        container.value.innerHTML = `<span style="color: red; font-size: 14px; padding: 8px; border: 1px solid red;">Error: ${error.message}</span>`;
    }
};

onMounted(() => {
    document.fonts.ready.then(render).catch(() => setTimeout(render, 500));
});

watch([() => props.notes, () => props.timeSignature, () => props.clef, () => props.showTimeSignature], render);
</script>

<template>
    <span ref="container" class="sparkline spark-score"></span>
</template>
