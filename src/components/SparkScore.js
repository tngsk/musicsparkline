import * as VexFlow from "vexflow";

const PITCH_REGEX = /^([A-Ga-g])([#b]?)(\d+)$/i;

export class SparkScore extends HTMLElement {
    static get observedAttributes() {
        return ['notes', 'time-signature', 'clef', 'show-time-signature'];
    }

    constructor() {
        super();
        this.container = document.createElement('span');
        this.container.className = 'sparkline spark-score';
        this.renderPending = false;
    }

    connectedCallback() {
        if (!this.contains(this.container)) {
            this.appendChild(this.container);
        }
        this.scheduleRender();
        document.fonts.ready.then(() => this.scheduleRender()).catch(() => setTimeout(() => this.scheduleRender(), 500));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.scheduleRender();
        }
    }

    get notes() {
        return this.getAttribute('notes') || '';
    }
    set notes(val) {
        if (val) {
            this.setAttribute('notes', val);
        } else {
            this.removeAttribute('notes');
        }
    }

    get timeSignature() {
        return this.getAttribute('time-signature') || '4/4';
    }
    set timeSignature(val) {
        if (val) {
            this.setAttribute('time-signature', val);
        } else {
            this.removeAttribute('time-signature');
        }
    }

    get clef() {
        return this.getAttribute('clef') || 'treble';
    }
    set clef(val) {
        if (val) {
            this.setAttribute('clef', val);
        } else {
            this.removeAttribute('clef');
        }
    }

    get showTimeSignature() {
        return this.hasAttribute('show-time-signature') && this.getAttribute('show-time-signature') !== 'false';
    }
    set showTimeSignature(val) {
        if (val) {
            this.setAttribute('show-time-signature', val);
        } else {
            this.removeAttribute('show-time-signature');
        }
    }

    scheduleRender() {
        if (this.renderPending) return;
        this.renderPending = true;
        // Schedule rendering after current macro-task to batch attribute updates
        setTimeout(() => {
            this.renderPending = false;
            if (this.isConnected) {
                this.render();
            }
        }, 0);
    }

    render() {
        if (!this.container) return;

        try {
            this.container.innerHTML = "";

            if (!this.notes) return;

            const { Factory, Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = VexFlow;

            const noteGroups = this.notes.split(",");
            const noteCount = noteGroups.length;
            const width = Math.max(150, noteCount * 40 + (this.showTimeSignature ? 100 : 60));

            const vf = new Factory({
                renderer: {
                    elementId: this.container,
                    backend: Renderer.Backends.SVG,
                    width: width,
                    height: 120, // Reduced height for inline
                },
            });

            const context = vf.getContext();
            const stave = new Stave(10, 10, width - 20);
            stave.addClef(this.clef);
            if (this.showTimeSignature) {
                stave.addTimeSignature(this.timeSignature);
            }
            stave.setContext(context).draw();

            const vfNotes = noteGroups.map((noteGroupStr) => {
                // Check for duration at the end of the group (e.g. C4+E4+G4/h)
                const [pitchesStr, duration = "q"] = noteGroupStr.trim().split("/");
                const pitches = pitchesStr.split("+").map(p => p.trim());

                const keys = [];
                const accidentals = [];

                pitches.forEach((pitchStr, index) => {
                    const pitchMatch = pitchStr.match(PITCH_REGEX);
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
                    clef: this.clef
                });

                accidentals.forEach(acc => {
                    staveNote.addModifier(new Accidental(acc.type), acc.index);
                });

                return staveNote;
            });

            const [numBeats, beatValue] = this.timeSignature
                .split("/")
                .map(Number);
            const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
            voice.setStrict(false);
            voice.addTickables(vfNotes);

            new Formatter().joinVoices([voice]).format([voice], width - 40);
            voice.draw(context, stave);

            const svg = this.container.querySelector("svg");
            if (svg) {
                svg.style.cssText = "height: 4em; width: auto; display: inline-block; vertical-align: middle;";
                svg.setAttribute("viewBox", `0 0 ${width} 120`);
                svg.querySelectorAll("*").forEach((el) => {
                    if (el.tagName !== "svg")
                        el.style.cssText = "fill: black; stroke: black;";
                });
            }
        } catch (error) {
            this.container.innerHTML = `<span style="color: red; font-size: 14px; padding: 8px; border: 1px solid red;">Error: ${error.message}</span>`;
        }
    }
}
