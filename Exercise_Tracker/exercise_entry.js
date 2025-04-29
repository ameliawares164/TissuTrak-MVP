// Example loading an exercise object from localStorage
const selectedEntry = JSON.parse(localStorage.getItem('selectedExercise')) || null;

document.getElementById('back-btn').addEventListener('click', function() {
  window.location.href = 'exercise_history.html'; // Go back to Exercise History
});

function populateEntry(entry) {
  const container = document.getElementById('entry-details');
  if (!entry) {
    container.innerHTML = '<p>No exercise selected.</p>';
    return;
  }

  container.innerHTML = `
    <div class="entry-title">${entry.activityType}</div>
    <p><strong>Date:</strong> ${entry.date || 'Unknown'} at ${entry.time || 'Unknown'}</p>
    <p><strong>Duration:</strong> ${entry.duration.value} ${entry.duration.unit}</p>
    <p><strong>Calories Burned:</strong> ${entry.caloriesBurned} kcal</p>
    <p><strong>Vitals Before Activity:</strong> ${entry.vitalsBefore.value} ${entry.vitalsBefore.type}</p>
    <p><strong>Vitals During Activity:</strong> ${entry.vitalsDuring.value} ${entry.vitalsDuring.type}</p>
    <p><strong>Pain Level:</strong> ${entry.painLevel}</p>
    <p><strong>Notes:</strong> ${entry.notes || 'None'}</p>
  `;
}

// Load entry on page load
populateEntry(selectedEntry);
