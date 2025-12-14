<template>
  <div id="app">
    <header class="ctf-header">
      <h1>Pokémon themed CTF Challenges</h1>
      <p></p>
    </header>

    <div class="challenge-grid">
      <div class="challenge-tile">
        <UnownSav />
      </div>
      <div class="challenge-tile">
        <InvalidAuth />
      </div>
      <!-- Add more challenge tiles here -->
    </div>
  </div>
</template>

<script setup>
import UnownSav from "./components/UnownSav.vue";
import InvalidAuth from "./components/PokeDex.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: #eee;
  padding: 20px;
}

.ctf-header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(66, 185, 131, 0.3);
}

.ctf-header h1 {
  font-size: 2.5em;
  color: #42b983;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(66, 185, 131, 0.5);
}

.ctf-header p {
  font-size: 1.2em;
  color: #aaa;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.challenge-tile {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(66, 185, 131, 0.3);
  border-radius: 15px;
  padding: 30px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.challenge-tile:hover {
  transform: translateY(-5px);
  border-color: #42b983;
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.3);
}

@media (max-width: 768px) {
  .challenge-grid {
    grid-template-columns: 1fr;
  }

  .ctf-header h1 {
    font-size: 2em;
  }
}
</style>
