import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { SparkScore } from './components/SparkScore.js'
import { SparkPlay } from './components/SparkPlay.js'

customElements.define('spark-score', SparkScore)
customElements.define('spark-play', SparkPlay)

createApp(App).mount('#app')
