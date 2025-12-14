/**
 * Firebase Cloud Function for Pokemon CTF
 * Cost-saving settings: minimal memory, max 1 instance
 */

const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

admin.initializeApp();
const db = admin.database();

const pokemon = require("./pokedex.json");

const WORST_POKEMON = "there_is_none";
const MAX_LOGS = 100;
const LOG_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

/* --- Helper Functions --- */
/**
 * Cleans up old logs and limits total log count
 */
async function cleanupLogs() {
  const logsRef = db.ref("logs");
  const now = Date.now();
  const cutoffTime = now - LOG_EXPIRY_MS;

  // Get all logs
  const snapshot = await logsRef.once("value");
  const logs = snapshot.val();

  if (!logs) return;

  const logEntries = Object.entries(logs);
  const updates = {};

  // Delete logs older than 30 minutes
  logEntries.forEach(([key, log]) => {
    if (log.time < cutoffTime) {
      updates[key] = null;
    }
  });

  // If still over MAX_LOGS, delete oldest entries
  const remainingLogs = logEntries.filter(([key]) => updates[key] !== null);
  if (remainingLogs.length > MAX_LOGS) {
    const sortedByTime = remainingLogs.sort((a, b) => a[1].time - b[1].time);
    const toDelete = sortedByTime.slice(0, remainingLogs.length - MAX_LOGS);
    toDelete.forEach(([key]) => {
      updates[key] = null;
    });
  }

  // Apply all deletions at once
  if (Object.keys(updates).length > 0) {
    await logsRef.update(updates);
  }
}

/* --- Routes --- */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/getpokemon", (req, res) => {
  res.send("gotta pick a specific pokemon! '/getpokemon/{pokedex_entry}'");
});

app.get("/getpokemon/:pokedexentry", (req, res) => {
  const entry = req.params.pokedexentry;
  const poke = pokemon.find((p) => p.id === parseInt(entry));

  if (poke) {
    res.json(poke);
  } else {
    res.status(404).json({ error: "Pokémon not found", pokedexEntry: entry });
  }
});

app.post("/flag", async (req, res) => {
  const guess = (req.body.guess || "").trim();

  try {
    // Fetch all flags from database
    const flagsSnapshot = await db.ref("flags").once("value");
    const flags = flagsSnapshot.val();

    if (!flags) {
      return res.status(500).json({
        success: false,
        message: "No flags configured in database",
      });
    }

    // Check if guess matches any flag value
    const flagValues = Object.values(flags);
    const isCorrect = flagValues.some((flag) => flag === guess);

    if (isCorrect) {
      return res.json({
        success: true,
        message: "Correct flag! 🎉",
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect flag. Try again!",
      });
    }
  } catch (error) {
    console.error("Error checking flag:", error);
    return res.status(500).json({
      success: false,
      message: "Error checking flag",
    });
  }
});

app.post("/guess", async (req, res) => {
  const guess = (req.body.guess || "").toLowerCase();

  if (guess !== WORST_POKEMON) {
    // 🚨 BAD LOGGING PRACTICE (intentional)
    await db.ref("logs").push({
      time: Date.now(),
      msg: `How hurtful! ${guess} isn't the worst pokemon!`,
      dbg: `guess != ${WORST_POKEMON}`,
      userGuess: guess,
    });

    // Cleanup logs after adding new one
    cleanupLogs().catch(console.error);

    return res.status(400).json({
      msg: `How hurtful! ${guess} isn't the worst pokemon!`,
    });
  }

  res.json({
    msg: `Congrats you found the flag! 
        pokectf{all_pokemon_are_valuable}`,
  });
});

/* --- Export as Firebase Function with cost-saving settings --- */
exports.api = onRequest(
  {
    memory: "128MiB",
    maxInstances: 1,
    timeoutSeconds: 60,
  },
  app
);

/* --- Scheduled cleanup every 10 minutes --- */
exports.scheduledCleanup = onSchedule(
  {
    schedule: "every 10 minutes",
    timeoutSeconds: 60,
    memory: "128MiB",
  },
  async () => {
    await cleanupLogs();
  }
);
