// Load Today's Health values when page loads
window.onload = function() {
  loadMood();
  loadHeartRate();
  loadSymptoms();
};

function loadMood() {
  const moodData = JSON.parse(localStorage.getItem('mental_health_tracker_log_mood_1')) || [];
  if (moodData.length > 0) {
    const latestMood = moodData[moodData.length - 1].mood || 'N/A';
    document.getElementById('mood-value').innerText = latestMood;
  } else {
    document.getElementById('mood-value').innerText = 'No Data';
  }
}

function loadHeartRate() {
  const vitalsData = JSON.parse(localStorage.getItem('vitals_tracker_log_vitals')) || [];
  if (vitalsData.length > 0) {
    const latestHR = vitalsData[vitalsData.length - 1].heartRate || 'N/A';
    document.getElementById('heart-rate-value').innerText = latestHR + ' bpm';
  } else {
    document.getElementById('heart-rate-value').innerText = 'No Data';
  }
}

function loadSymptoms() {
  const symptoms1 = JSON.parse(localStorage.getItem('symptom_tracker_log_symptom_1')) || [];
  const symptoms2 = JSON.parse(localStorage.getItem('symptom_tracker_log_symptom_2')) || [];
  const totalSymptoms = symptoms1.length + symptoms2.length;

  document.getElementById('symptoms-count').innerText = totalSymptoms + ' Logged';
}

// Navigation Functions for Buttons
function logSymptoms() {
  window.location.href = "symptom_tracker/homepage.html";
}

function mentalHealth() {
  window.location.href = "mental_health_tracker/mental_homepage.html";
}

function logExercise() {
  window.location.href = "exercise_tracker/exercise_homepage.html";
}

function appointments() {
  window.location.href = "appointment_tracker/appointment_homepage.html";
}

function logWater() {
  window.location.href = "food_water_tracker/food_homepage.html";
}

function logFood() {
  window.location.href = "food_water_tracker/food_homepage.html";
}

function monitorVitals() {
  window.location.href = "vitals_tracker/vitals_homepage.html";
}

function medication() {
  window.location.href = "medication_tracker/medication_homepage.html";
}

// Navigation for Bottom Nav Bar
function goHome() {
  window.location.href = "homescreen.html";
}

function goSymptoms() {
  window.location.href = "symptom_tracker/homepage.html";
}

function goReports() {
  window.location.href = "reports_homepage.html"; // (Adjust this if you have a reports screen)
}

function goProfile() {
  window.location.href = "profile_homepage.html"; // (Adjust this if you have a profile screen)
}
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
