// Log Exercise button
document.getElementById('log-exercise-btn').addEventListener('click', function() {
    window.location.href = 'log_exercise.html';
});

// Recent Entries button
document.getElementById('exercise-history-btn').addEventListener('click', function() {
    window.location.href = 'exercise_history.html';
});

// Load Recent Entries
function loadRecentEntries() {
    const recentContainer = document.getElementById('entries-list'); // Make sure you have this ID on your homepage
    let savedExercises = JSON.parse(localStorage.getItem('exerciseEntries')) || [];

    // Sort exercises newest first (most recent at top)
    savedExercises = savedExercises.reverse();

    // Show up to 5 most recent
    const recent = savedExercises.slice(0, 5);

    // Clear existing
    recentContainer.innerHTML = '';

    if (recent.length === 0) {
        recentContainer.innerHTML = '<p>No recent exercises found.</p>';
        return;
    }

    recent.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <strong>${entry.activityType}</strong>
            <p>${entry.date || 'Unknown Date'} | ${entry.time || 'Unknown Time'}</p>
        `;
        recentContainer.appendChild(div);
    });
}

// Load on page ready
document.addEventListener('DOMContentLoaded', loadRecentEntries);
// Log Exercise button
document.getElementById('log-exercise-btn').addEventListener('click', function() {
    window.location.href = 'log_exercise.html';
});

// Recent Entries button
document.getElementById('exercise-history-btn').addEventListener('click', function() {
    window.location.href = 'exercise_history.html';
});

// Load Recent Entries
function loadRecentEntries() {
    const recentContainer = document.getElementById('entries-list');
    let savedExercises = JSON.parse(localStorage.getItem('exerciseEntries')) || [];

    // Sort newest first
    savedExercises = savedExercises.reverse();

    // Show up to 5 most recent
    const recent = savedExercises.slice(0, 5);

    recentContainer.innerHTML = '';

    if (recent.length === 0) {
        recentContainer.innerHTML = '<p>No recent exercises found.</p>';
        return;
    }

    recent.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <strong>${entry.activityType}</strong>
            <p>${entry.date || 'Unknown Date'} | ${entry.time || 'Unknown Time'}</p>
        `;

        // Make the entry clickable
        div.addEventListener('click', function() {
            localStorage.setItem('selectedExercise', JSON.stringify(entry));
            window.location.href = 'exercise_entry.html';
        });

        recentContainer.appendChild(div);
    });
}

// Load when page is ready
document.addEventListener('DOMContentLoaded', loadRecentEntries);
function goHome() {
    window.location.href = "/homescreens/homescreen.html";
  }
  
  function goToSymptoms() {
    window.location.href = "/symptom_tracker/homepage.html";
  }
  
  function goToReports() {
    window.location.href = "/reports.html";
  }
  
  function goToProfile() {
    window.location.href = "/medical_profile/profile_homepage.html";
  }
  