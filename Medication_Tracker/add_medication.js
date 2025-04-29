// Elements
const backBtn = document.getElementById('back-btn');
const medicationForm = document.getElementById('medication-form');

// Navigation
backBtn.addEventListener('click', () => {
  window.location.href = "medication_homepage.html";
});

// Save Medication on Form Submit
medicationForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Gather form data
  const name = document.getElementById('medication-name').value.trim();
  const dosage = document.getElementById('dosage').value.trim();
  const dosageUnit = document.getElementById('dosage-unit').value;
  const administrationMethod = document.getElementById('administration-method').value;
  const reason = document.getElementById('reason').value.trim();
  
  let frequency = document.getElementById('frequency').value;
  if (frequency === 'Other') {
    frequency = document.getElementById('custom-frequency').value.trim();
  }

  const times = document.getElementById('times').value.trim(); // multiple times separated by comma
  const startDate = document.getElementById('start-date').value;
  const notes = document.getElementById('notes').value.trim();

  if (!name || !dosage || !times || !startDate) {
    alert('Please fill in at least Name, Dosage, Times to take, and Start Date.');
    return;
  }

  // Build new medication object
  const newMedication = {
    id: Date.now(), // unique ID
    name: name,
    dosage: `${dosage} ${dosageUnit}`,
    method: administrationMethod,
    reason: reason || "N/A",
    frequency: frequency || "N/A",
    times: times, // stored as string "8:00 AM, 6:00 PM"
    startDate: startDate,
    endDate: null, // no end date yet
    notes: notes || ""
  };

  // Save into localStorage
  let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  currentMeds.push(newMedication);
  localStorage.setItem('current_medications', JSON.stringify(currentMeds));

  // Optionally also store in medication_logs if you want future logs to start
  // let medicationLogs = JSON.parse(localStorage.getItem('medication_logs')) || [];
  // localStorage.setItem('medication_logs', JSON.stringify(medicationLogs));

  alert('Medication added successfully!');
  window.location.href = "medication_homepage.html"; // Redirect after save
});
