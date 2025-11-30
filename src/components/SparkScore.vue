<script setup>
import { onMounted, ref, watch } from "vue";
import * as VexFlow from "vexflow";

const props = defineProps({
    notes: { type: String, required: true },
    timeSignature: { type: String, default: "4/4" },
});

const container = ref(null);

const render = () => {
    if (!container.value) return;

    try {
        container.value.innerHTML = "";

        const { Factory, Renderer, Stave, StaveNote, Voice, Formatter } =
            VexFlow;
        const noteCount = props.notes.split(",").length;
        const width = Math.max(400, noteCount * 80 + 150);

        const vf = new Factory({
            renderer: {
                elementId: container.value,
                backend: Renderer.Backends.SVG,
                width: width,
                height: 180,
            },
        });

        const context = vf.getContext();
        const stave = new Stave(20, 50, width - 40);
        stave.addClef("treble").addTimeSignature(props.timeSignature);
        stave.setContext(context).draw();

        const vfNotes = props.notes.split(",").map((noteStr) => {
            const match = noteStr
                .trim()
                .match(/^([A-Ga-g][#b]?\d+)(?:\/(\w+))?$/i);
            if (!match) return new StaveNote({ keys: ["c/4"], duration: "q" });

            const [, pitchStr, duration = "q"] = match;
            const pitchMatch = pitchStr.match(/^([A-Ga-g])([#b]?)(\d+)$/i);
            let key = "c/4";
            if (pitchMatch) {
                const [, note, accidental, octave] = pitchMatch;
                key = `${note.toLowerCase()}${accidental}/${octave}`;
            }

            const staveNote = new StaveNote({
                keys: [key],
                duration: duration,
                auto_stem: true,
            });
            if (pitchMatch && pitchMatch[2]) {
                staveNote.addModifier(new VexFlow.Accidental(pitchMatch[2]), 0);
            }
            return staveNote;
        });

        const [numBeats, beatValue] = props.timeSignature
            .split("/")
            .map(Number);
        const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
        voice.setStrict(false);
        voice.addTickables(vfNotes);

        new Formatter().joinVoices([voice]).format([voice], width - 80);
        voice.draw(context, stave);

        const svg = container.value.querySelector("svg");
        if (svg) {
            svg.style.cssText = "width: 100%; height: auto;";
            svg.setAttribute("viewBox", `0 0 ${width} 180`);
            svg.querySelectorAll("*").forEach((el) => {
                if (el.tagName !== "svg")
                    el.style.cssText = "fill: black; stroke: black;";
            });
        }
    } catch (error) {
        container.value.innerHTML = `<div style="color: red; font-size: 14px; padding: 8px; border: 1px solid red;">Error: ${error.message}</div>`;
    }
};

onMounted(() => {
    document.fonts.ready.then(render).catch(() => setTimeout(render, 500));
});

watch([() => props.notes, () => props.timeSignature], render);
</script>

<template>
    <div ref="container"></div>
</template>
