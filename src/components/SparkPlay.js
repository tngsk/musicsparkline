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
        if (!this.contains(this.button)) {
             // Create a wrapper or just prepend/append button based on needs.
             // Actually, if we just want a button inside the component,
             // it's cleaner to let the component *be* the container and
             // style it. But the Vue component *rendered* a button.
             // To not break Vue's text node tracking, let's just create a Shadow Root for the button.
             // Wait, the prompt requested Light DOM for simple implementation.
             // If we must use Light DOM, let's just make `SparkPlay` itself styled like the button or wrap its contents.
        }

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
