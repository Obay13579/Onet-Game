const express = require('express');
const router = express.Router();

// Sample in-memory database for high scores (replace with a database in a real application)
const highScores = [];

// Route to get high scores
router.get('/high-scores', (req, res) => {
  // Implement logic to retrieve high scores
  const scores = getHighScores();
  res.json(scores);
});

// Function to calculate and adjust scores based on remaining time
function calculateAdjustedScore(originalScore, remainingTime) {
  // You can define your scoring adjustment logic here
  // For example, you can subtract a portion of the remaining time from the original score.
  const scoreAdjustment = remainingTime; // Example adjustment: 1 point per second of remaining time
  return Math.max(originalScore - scoreAdjustment, 0); // Ensure the score doesn't go negative
}

// Sample function to retrieve high scores
function getHighScores() {
  // In a real application, you would fetch scores from a database
  // For now, we'll use the in-memory highScores array
  return highScores;
}

// Sample function to save a high score
function saveHighScore(username, score, remainingTime) {
  // Calculate the adjusted score
  const adjustedScore = calculateAdjustedScore(score, remainingTime);

  // Save the high score (replace with database storage)
  highScores.push({ username, score: adjustedScore });

  // In a real application, you would likely save this score to a database
}

// Route to save a high score
router.post('/save-high-score', (req, res) => {
  const { username, score, remainingTime } = req.body;

  // Save the high score
  saveHighScore(username, score, remainingTime);

  res.json({ message: 'High score saved successfully' });
});

// Other score-related routes

module.exports = router;
