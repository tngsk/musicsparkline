# Hello World

This is a simple Markdown file rendered by Vite.


## Audio Test
Click the button to play a C Major chord:
<spark-play notes="C4, E4, G4">Play C Major</spark-play>

## Score Test
Here is a C Major scale:
<spark-score notes="C4/8, D4/8, E4/8, F4/8, G4/8, A4/8, B4/8, C5/8" show-time-signature="true"></spark-score>

### Inline Typography Example
You can embed music notation right in the middle of a sentence! For example, the notes <spark-score notes="C4/q,E4/q,G4/h"></spark-score> form a C Major triad.

### Bass Clef Support
We can also write bass lines, like this walking bass: <spark-score clef="bass" notes="C3/8, E3/8, G3/8, A3/8, Bb3/8, A3/8, G3/8, E3/8"></spark-score>.

### Chord Support
And we can demonstrate harmony using the chord syntax `+`. Here is a progression: <spark-score notes="C4+E4+G4/q, F4+A4+C5/q, G4+B4+D5/q, C4+E4+G4/q"></spark-score>


