import * as Tone from 'tone';

export class SparkPlay extends HTMLElement {
    static get observedAttributes() {
        return ['notes'];
    }

    constructor() {
        super();
        this.button = document.createElement('button');
        this.button.className = 'btn btn-primary btn-sm';
        this.button.addEventListener('click', () => this.play());
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'notes' && oldValue !== newValue) {
            // Re-render or just update notes if needed. Notes are fetched via getter when playing.
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

    render() {
        // Since we are using Light DOM and want to support slots, we need to be careful
        // not to destroy child text nodes managed by Vue.
        // If the button is already appended and has children, we shouldn't reparent elements constantly.

        // Better approach for Light DOM: move children once.
        if (!this.contains(this.button)) {
            const fragment = document.createDocumentFragment();
            while (this.firstChild) {
                fragment.appendChild(this.firstChild);
            }
            if (fragment.childNodes.length === 0) {
                 this.button.textContent = 'Play';
            } else {
                 this.button.appendChild(fragment);
            }
            this.appendChild(this.button);
        }
    }

    async play() {
        if (!this.notes) return;

        await Tone.start();
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now();
        const notesArray = this.notes.split(',').map(n => n.trim());

        // Play notes for a duration of an 8th note
        synth.triggerAttackRelease(notesArray, "8n", now);
    }
}
