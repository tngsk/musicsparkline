# Music Sparkline System

This directory contains the core files for the "Music Sparkline" system, which allows you to embed interactive musical visualizations (scores, keyboards) and audio playback directly into Markdown content.

## Features
*   **Sparklines**: Inline SVG visualizations for musical scores (`<spark-score>`) and piano keyboards (`<spark-keys>`).
*   **Audio Playback**: Clickable buttons in Markdown to play notes/chords via Tone.js.
*   **Markdown Integration**: Seamless integration with `markdown-it`.

## Setup Instructions

### 1. Dependencies
Install the required packages in your project:
```bash
npm install vexflow tone
```

### 2. Configuration & Registration
Import and register the custom elements in your main JavaScript file:

```javascript
import { SparkScore } from './components/SparkScore.js'
import { SparkPlay } from './components/SparkPlay.js'

customElements.define('spark-score', SparkScore)
customElements.define('spark-play', SparkPlay)
```

Add the following basic CSS for styling the components:
```css
/* Add Sparkline styles */
.sparkline {
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
    background-color: transparent;
}
```

### 3. Usage
You can use the Web Components directly in your HTML or Markdown!

```html
# C Major Triad
This is a C Major triad: <spark-score notes="C4+E4+G4/q"></spark-score>

Play the chord: <spark-play notes="C4,E4,G4">Play C Major</spark-play>
```

## Example Preview

Below is a preview of what the rendered components look like:

![Preview Image](/home/jules/verification/screenshots/verification.png)
