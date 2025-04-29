const todaysMedsContainer = document.getElementById('todays-meds');

// Navigation

// Load Today's Medications
function loadMedications() {
  const currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  const medicationLogs = JSON.parse(localStorage.getItem('medication_logs')) || [];

  todaysMedsContainer.innerHTML = '';

  const todayDate = new Date().toISOString().split('T')[0];

  currentMeds.forEach(med => {
    const times = med.times ? med.times.split(',').map(t => t.trim()) : [];

    times.forEach(rawTime => {
      if (!rawTime) return;

      const alreadyTaken = medicationLogs.find(log =>
        log.date === todayDate &&
        log.medName === med.name &&
        log.time === rawTime &&
        log.status === 'taken'
      );

      createMedicationCard(med, rawTime, alreadyTaken ? true : false, todaysMedsContainer);
    });
  });
}

// Create Medication Card
function createMedicationCard(med, time, isTaken, container) {
  const card = document.createElement('div');
  card.classList.add('medication-card');

  const info = document.createElement('div');
  info.innerHTML = `<h3>${med.name}</h3><p>🕒 ${time}</p>`;

  const action = document.createElement('button');
  action.classList.add('action-btn');
  action.textContent = isTaken ? '✅' : '⏰ Log Now';

  if (isTaken) {
    action.classList.add('taken-btn');
  }

  action.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMedicationLog(med.name, time);
  });

  action.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    toggleMedicationLog(med.name, time);
  });

  card.appendChild(info);
  card.appendChild(action);

  card.addEventListener('click', () => {
    localStorage.setItem('selected_medication', JSON.stringify(med));
    window.location.href = "medication_entry.html";
  });

  container.appendChild(card);
}

// Toggle Taken / Unlog
function toggleMedicationLog(name, time) {
  const medicationLogs = JSON.parse(localStorage.getItem('medication_logs')) || [];
  const todayDate = new Date().toISOString().split('T')[0];

  const existingIndex = medicationLogs.findIndex(log =>
    log.date === todayDate &&
    log.medName === name &&
    log.time === time &&
    log.status === 'taken'
  );

  if (existingIndex !== -1) {
    medicationLogs.splice(existingIndex, 1);
  } else {
    medicationLogs.push({
      date: todayDate,
      medName: name,
      time: time,
      status: 'taken'
    });
  }

  localStorage.setItem('medication_logs', JSON.stringify(medicationLogs));

  const allButtons = document.querySelectorAll('.action-btn');
  allButtons.forEach(button => {
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 300);
  });

  loadMedications();
}

// Initialize
loadMedications();
function goHome() {
  window.location.href = "/homescreens/homescreen.html";
}

function goToMeds() {
  window.location.href = "/medication_tracker/medication_list.html";
}

function goToReports() {
  window.location.href = "/reports.html";
}

function goToCalendar() {
  window.location.href = "/medication_tracker/medication_schedule.html";
}
