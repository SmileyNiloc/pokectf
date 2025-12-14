<script setup></script>

<template>
  <div class="pokedex">
    <h1>Pokedex</h1>
    <p>
      Gotta catch 'em all... or at least look them up! Can you find my 1 xor 2
      favorite pokemon?
    </p>
    <a href="/pokedex.html" target="_blank" class="challenge-link">
      Launch Pokédex Lookup
    </a>
  </div>
</template>

<style scoped>
.pokedex {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 1.8em;
}

p {
  font-size: 1.1em;
  margin-bottom: 30px;
  color: #ccc;
}

.challenge-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.challenge-link:hover {
  background-color: #ee5a5a;
}
</style>
