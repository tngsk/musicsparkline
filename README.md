# Music Sparkline System

This directory contains the core files for the "Music Sparkline" system, which allows you to embed interactive musical visualizations (scores, keyboards) and audio playback directly into Markdown content.

## Features
*   **Sparklines**: Inline SVG visualizations for musical scores (`<spark-score>`) and piano keyboards (`<spark-keys>`).
*   **Audio Playback**: Clickable buttons in Markdown to play notes/chords via Tone.js.
*   **Markdown Integration**: Seamless integration with `markdown-it`.

## Setup Instructions

### 1. Dependencies
Install the required packages in your Vue project:
```bash
npm install tone markdown-it
npm install -D @tailwindcss/typography
```

### 2. File Placement
Copy the contents of `src` into your project's `src` directory.
-   `src/lib/SparklineUtils.js`: SVG generation logic.
-   `src/lib/MusicTheory.js`: Music theory definitions (optional, but useful).
-   `src/lib/AudioManager.js` & `instruments/`: Audio playback system.
-   `src/composables/useMusicMarkdown.js`: Logic to load Markdown and replace tags with SVGs.

### 3. Configuration
**Tailwind CSS**:
Ensure `@tailwindcss/typography` is added to your Tailwind config or CSS file.
```css
/* src/style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add Sparkline styles */
.sparkline {
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
    background-color: transparent;
}
.spark-keys {
    border-radius: 2px;
}
```

### 4. Usage
**In Markdown Files (`src/content/*.md`):**
You can import and use Vue components directly in your Markdown!

```markdown
<script setup>
import SparkKeys from '../components/SparkKeys.vue'
import SparkScore from '../components/SparkScore.vue'
</script>

# C Major Triad
This is a C Major triad: <SparkKeys notes="C4,E4,G4" />

Here is a score: <SparkScore notes="C4,E4,G4" />
```

**In Vue Components:**
Use `useMusicMarkdown` to load the Markdown and handle clicks for audio.

```vue
<script setup>
import { useMusicMarkdown } from './composables/useMusicMarkdown'
import { audioManager } from './lib/AudioManager'

const { content } = useMusicMarkdown('your-topic-id')

const handleClick = (e) => {
  const target = e.target.closest('[data-play]')
  if (target) {
    const notes = target.dataset.play.split(',')
    audioManager.resume()
    audioManager.playChord(notes)
  }
}
</script>

<template>
  <div class="prose" v-html="content" @click="handleClick"></div>
</template>
```
