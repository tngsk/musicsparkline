# Music Sparkline Specifications

## Overview
Music Sparkline is a system designed to create small, typography-sized musical scores embedded directly within text. It is written in Markdown and converted to HTML. The primary use case is for displaying short, single-staff musical examples commonly found in music theory books, such as melodies, bass lines, and chords.

## Core Requirements

### 1. Markdown Integration
* The system must allow users to author musical examples directly within Markdown files.
* Markdown files are processed and rendered into HTML.
* Custom syntax or components (e.g., Vue components within Markdown via `markdown-it`) will be used to denote sparklines.

### 2. Inline Typography Sizing (Sparklines)
* **Definition:** Sparklines are small, word-sized graphics embedded inline with text.
* The musical scores (`<spark-score>`) must be sized appropriately to flow inline within a sentence or paragraph.
* The height of the score should scale with the surrounding text (`em` or `ex` units).
* Vertical alignment should ensure the staff aligns naturally with the text baseline.
* The visual presentation should be compact, omitting unnecessary elements (like time signatures, unless explicitly requested) that would clutter an inline display.

### 3. Musical Content Support
The system focuses on short, single-staff measures demonstrating fundamental musical concepts:
* **Melodies:** Sequences of single notes, primarily using the treble clef.
* **Bass Lines:** Sequences of single notes, primarily using the bass clef. Support for configurable clefs is required.
* **Chords (Harmonies):** Multiple notes played simultaneously on a single staff. The input syntax must allow for defining chords (e.g., `C4+E4+G4`).

### 4. Interactive Audio (Existing Feature)
* The system should support playback of the notes or chords displayed in the sparklines via Tone.js.

## Technical Implementation Details

* **Framework:** Vue 3, Vite, and Markdown-It (via `unplugin-vue-markdown`).
* **Rendering Engine:** VexFlow is used for rendering the SVG musical scores.
* **Component Design (`SparkScore.vue`):**
    * Must accept a concise string format for notes (e.g., `C4/q, D4/q`).
    * Must support an extended string format for chords (e.g., `C4+E4+G4/h`).
    * Must accept properties for `clef` (default 'treble').
    * Output element should be a `<span>` with appropriate CSS (`display: inline-block`, `vertical-align: middle`) to function as a sparkline.
    * The generated SVG must use a `viewBox` and responsive CSS (`height`, `width: auto`) to adapt to text size.
