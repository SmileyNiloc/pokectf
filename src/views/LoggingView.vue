<template>
  <div class="logging-view">
    <h1>Guess the Weakest Pokemon</h1>
    <div class="input-section">
      <input v-model="guess" type="text" placeholder="Enter your guess here" />
      <button @click="submitGuess">Submit</button>
      <button @click="loadLogs">Get Logs</button>
    </div>
    <div v-if="logMessages.length > 0" class="logs-section">
      <h2>Logs</h2>
      <ul>
        <li v-for="(msg, index) in logMessages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const API_URL = "https://us-central1-pokectf.cloudfunctions.net/api";
const LOG_URL = "https://pokectf-default-rtdb.firebaseio.com/logs.json";

const guess = ref("Enter your guess here");
const logs = ref({});

const logMessages = computed(() => {
  const messages = [];
  for (const key in logs.value) {
    if (logs.value[key] && logs.value[key].msg) {
      messages.push(logs.value[key].msg);
    }
  }
  return messages;
});

const submitGuess = async () => {
  try {
    const response = await fetch(`${API_URL}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guess.value }),
    });
    const data = await response.json();
    console.log("Guess submitted:", data);
    alert(`${data.msg}`);
  } catch (error) {
    console.error("Error submitting guess:", error);
  }
};

const loadLogs = async () => {
  try {
    const response = await fetch(`${LOG_URL}`, {
      method: "GET",
    });
    const data = await response.json();
    logs.value = data || {};
    // console.log("Logs loaded:", data);
  } catch (error) {
    console.error("Error loading logs:", error);
  }
};
</script>
<style scoped>
.logging-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

input {
  flex: 1;
  padding: 10px;
  border: 2px solid rgba(66, 185, 131, 0.3);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  color: #eee;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35a372;
}

.logs-section {
  margin-top: 30px;
}

.logs-section h2 {
  color: #ff6b6b;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(66, 185, 131, 0.3);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  color: #ccc;
}
</style>
