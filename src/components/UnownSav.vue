<script setup></script>

<template>
  <div class="unown-sav">
    <h1>Unown Sav</h1>
    <p>Some creatures like to spell things out…</p>
    <a
      href="/pokemon_grey.sav"
      download="pokemon_grey.sav"
      class="download-link"
    >
      Download pokemon_grey.sav
    </a>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.unown-sav {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #42b983;
  margin-bottom: 20px;
  font-size: 1.8em;
}

p {
  font-size: 1.1em;
  margin-bottom: 30px;
  color: #ccc;
}

.download-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.download-link:hover {
  background-color: #35a372;
}
</style>
