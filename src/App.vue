<template>
    <div style="max-width: 800px; margin: 0 auto; padding: 20px">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px">
            Music Sparkline System
        </h1>

        <div
            style="
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f0f9ff;
                border-radius: 8px;
            "
        >
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 10px">
                🎵 Audio
            </h2>
            <spark-play notes="C4, E4, G4">Play Chord</spark-play>
        </div>

        <div
            style="
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f0fdf4;
                border-radius: 8px;
            "
        >
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 15px">
                🎼 Scores
            </h2>

            <div
                style="
                    margin-bottom: 15px;
                    padding: 12px;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                "
            >
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px">
                    Single note:
                </p>
                <spark-score notes="C4/q"></spark-score>
            </div>

            <div
                style="
                    margin-bottom: 15px;
                    padding: 12px;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                "
            >
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px">
                    Scale:
                </p>
                <spark-score
                    notes="C4/8, D4/8, E4/8, F4/8, G4/8, A4/8, B4/8, C5/8"
                ></spark-score>
            </div>

            <div
                style="
                    margin-bottom: 15px;
                    padding: 12px;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                "
            >
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px">
                    Accidentals:
                </p>
                <spark-score notes="F#4/q, Bb4/q, C#5/q"></spark-score>
            </div>

            <div
                style="
                    margin-bottom: 15px;
                    padding: 12px;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                "
            >
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px">
                    Chords & Bass:
                </p>
                <spark-score notes="C4+E4+G4/q, C4+E4+G4/h" show-time-signature="true"></spark-score>
                <br />
                <spark-score clef="bass" notes="C3/q, G3/q, C4/h"></spark-score>
            </div>

            <div
                style="
                    margin-bottom: 15px;
                    padding: 12px;
                    background-color: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                "
            >
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px">
                    Inline Typography:
                </p>
                <p style="font-size: 16px; line-height: 2;">
                    A C Major triad <spark-score notes="C4+E4+G4/q"></spark-score> can be embedded within text easily.
                </p>
            </div>
        </div>

        <div
            style="padding: 15px; background-color: #fffbeb; border-radius: 8px"
        >
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 10px">
                Usage
            </h2>
            <code
                style="
                    font-family: monospace;
                    font-size: 14px;
                    background-color: white;
                    padding: 8px;
                    border: 1px solid #e5e7eb;
                    border-radius: 4px;
                    display: block;
                "
            >
                &lt;spark-score notes="C4/q, D4/q, E4/q"&gt;&lt;/spark-score&gt;
            </code>
        </div>
    </div>
</template>
