<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#42b983",
  },
  isDownload: {
    type: Boolean,
    default: false,
  },
  openInNewTab: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="problem-tile">
    <h1 :style="{ color: color }">{{ title }}</h1>
    <p>{{ description }}</p>
    <a
      :href="linkUrl"
      :download="
        isDownload
          ? linkText.includes('.sav')
            ? 'pokemon_grey.sav'
            : linkUrl.split('/').pop()
          : null
      "
      :target="openInNewTab ? '_blank' : null"
      class="action-link"
      :style="{ backgroundColor: color }"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<style scoped>
.problem-tile {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.8em;
}

p {
  font-size: 1.1em;
  margin-bottom: 30px;
  color: #ccc;
}

.action-link {
  display: inline-block;
  padding: 12px 24px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.action-link:hover {
  filter: brightness(0.9);
  transform: scale(1.05);
}
</style>
