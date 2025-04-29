// Update Water and Food Intake Progress Bars
function updateUI() {
  const waterIntake = parseFloat(localStorage.getItem('waterIntake')) || 0;
  const waterGoal = 80;
  const foodMeals = parseInt(localStorage.getItem('foodMeals')) || 0;
  const foodGoal = 5;

  const waterProgress = (waterIntake / waterGoal) * 100;
  document.getElementById('water-progress').textContent = `${waterIntake}oz / ${waterGoal}oz`;
  document.getElementById('water-progress-bar').style.width = `${waterProgress}%`;

  document.getElementById('food-progress').textContent = `${foodMeals} / ${foodGoal} Meals Today`;
}

// Display Recent Logs (Food + Water)
function updateRecentLogs() {
  const foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || [];
  const waterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];

  const combinedLogs = [...foodLogs.map(log => ({ ...log, type: 'food' })), 
                        ...waterLogs.map(log => ({ ...log, type: 'water' }))];

  combinedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const recentLogsList = document.getElementById('recent-logs');
  recentLogsList.innerHTML = '';

  combinedLogs.slice(0, 5).forEach((log, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${log.type === 'food' ? '🍴' : '💧'}
      ${log.mealName || log.waterType} - ${log.date.split('T')[0]} ${log.time || ''}
    `;
    li.dataset.index = index;
    li.dataset.type = log.type;
    li.style.cursor = "pointer";

    li.addEventListener('click', function() {
      if (log.type === 'food') {
        localStorage.setItem('selectedFoodEntry', JSON.stringify(log));
        window.location.href = 'food_entry.html';
      } else {
        localStorage.setItem('selectedWaterEntry', JSON.stringify(log));
        window.location.href = 'water_entry.html';
      }
    });

    recentLogsList.appendChild(li);
  });
}

// Button Listeners
document.getElementById('logFoodBtn').addEventListener('click', function() {
  window.location.href = 'log_food.html';
});

document.getElementById('logWaterBtn').addEventListener('click', function() {
  window.location.href = 'log_water.html';
});

document.getElementById('settings-btn').addEventListener('click', function() {
  alert('Settings coming soon!');
});

// Navbar dummy links
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

// Init
updateUI();
updateRecentLogs();
document.getElementById('viewHistoryBtn').addEventListener('click', function() {
  window.location.href = 'food_water_history.html';
});
