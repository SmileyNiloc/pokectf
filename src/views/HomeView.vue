<template>
  <div class="home">
    <header class="ctf-header">
      <h1>Pokémon themed CTF Challenges</h1>
      <p>Test your skills across multiple challenges</p>
    </header>

    <div class="flag-submission">
      <h2>🚩 Flag Checker</h2>
      <p class="subtitle">Found a flag? Submit it here!</p>
      <div class="input-group">
        <input
          v-model="flag"
          type="text"
          placeholder="pokectf{...}"
          @keyup.enter="flagGuess"
        />
        <button @click="flagGuess">Check Flag</button>
      </div>
    </div>

    <div class="challenge-grid">
      <div class="challenge-tile">
        <ProblemTile
          title="Unown Sav"
          description="Some creatures like to spell things out…"
          link-text="Download pokemon_grey.sav"
          link-url="https://firebasestorage.googleapis.com/v0/b/pokectf.firebasestorage.app/o/public%2Fpokemon_grey.sav?alt=media"
          color="#42b983"
          :is-download="true"
        />
      </div>
      <div class="challenge-tile">
        <ProblemTile
          title="Pokedex"
          description="Gotta catch 'em all... or at least look them up! Can you find my 1 xor 2 favorite pokemon?"
          link-text="Launch Pokédex Lookup"
          link-url="/pokedex.html"
          color="#ff6b6b"
          :open-in-new-tab="true"
        />
      </div>
      <div class="cllenge-tile">
        <ProblemTile
          title="Bad Logs"
          description="The professor said he fixed the logging system, but I'm not sure I believe him..."
          link-text="Let's take a look"
          link-url="/logging"
          color="#f39c12"
          :open-in-new-tab="true"
        />
      </div>
      <!-- Add more challenge tiles here -->
    </div>
  </div>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import ProblemTile from "../components/ProblemTile.vue";
import { ref } from "vue";
const flag = ref("Check Flag here");

const API_URL = "https://us-central1-pokectf.cloudfunctions.net/api";

const flagGuess = async () => {
  try {
    const response = await fetch(`${API_URL}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: flag.value }),
    });
    const data = await response.json();
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error checking flag:", error);
    alert("Error checking flag. Please try again.");
  }
};
</script>

<style scoped>
.home {
  width: 100%;
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

.flag-submission {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 30px;
  margin: 0 auto 40px;
  max-width: 600px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.flag-submission h2 {
  color: #ffd700;
  margin-bottom: 10px;
  font-size: 1.8em;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.flag-submission .subtitle {
  color: #ccc;
  margin-bottom: 20px;
  font-size: 1em;
}

.input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  color: #eee;
  font-size: 1em;
  font-family: "Courier New", Courier, monospace;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #ffd700;
}

.input-group button {
  padding: 12px 24px;
  background-color: #ffd700;
  color: #1a1a2e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  white-space: nowrap;
}

.input-group button:hover {
  background-color: #ffed4e;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
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
