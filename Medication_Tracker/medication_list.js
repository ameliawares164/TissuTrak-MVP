// Elements
const currentContainer = document.getElementById('current-medications');
const pastContainer = document.getElementById('past-medications');
const backBtn = document.getElementById('back-btn');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const addNewBtn = document.getElementById('add-new-btn');

// Navigation
backBtn.addEventListener('click', () => {
  window.location.href = "medication_homepage.html";
});

addNewBtn.addEventListener('click', () => {
  window.location.href = "add_medication.html";
});

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


// Show/Hide Search
searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('hidden');
});

// Load Medications
function loadMedications(filter = '') {
  currentContainer.innerHTML = '';
  pastContainer.innerHTML = '';

  const currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  const pastMeds = JSON.parse(localStorage.getItem('past_medications')) || [];

  // Sort by Start Date (newest first)
  currentMeds.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  pastMeds.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  currentMeds.forEach(med => {
    if (med.name.toLowerCase().includes(filter.toLowerCase())) {
      createMedicationCard(med, currentContainer, false);
    }
  });

  pastMeds.forEach(med => {
    if (med.name.toLowerCase().includes(filter.toLowerCase())) {
      createMedicationCard(med, pastContainer, true);
    }
  });
}

// Create Medication Card
function createMedicationCard(med, container, isPast) {
  const card = document.createElement('div');
  card.classList.add('medication-card');

  const header = document.createElement('div');
  header.classList.add('med-header');
  header.innerHTML = `
    <h3>${med.name}</h3>
    <p>${med.dosage} — ${med.frequency}</p>
  `;

  const actions = document.createElement('div');
  actions.classList.add('med-actions');

  if (isPast) {
    const reactivateBtn = document.createElement('button');
    reactivateBtn.innerHTML = '🔄';
    reactivateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      reactivateMedication(med);
    });
    actions.appendChild(reactivateBtn);
  } else {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteMedication(med);
    });
    actions.appendChild(deleteBtn);
  }

  card.appendChild(header);
  card.appendChild(actions);

  card.addEventListener('click', () => {
    localStorage.setItem('selected_medication', JSON.stringify(med));
    window.location.href = "medication_entry.html";
  });

  container.appendChild(card);
}

// Delete Medication
function deleteMedication(med) {
  if (confirm(`Are you sure you want to delete ${med.name}?`)) {
    let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
    currentMeds = currentMeds.filter(m => m.id !== med.id);
    localStorage.setItem('current_medications', JSON.stringify(currentMeds));
    loadMedications();
  }
}

// Reactivate Medication
function reactivateMedication(med) {
  let pastMeds = JSON.parse(localStorage.getItem('past_medications')) || [];
  pastMeds = pastMeds.filter(m => m.id !== med.id);
  localStorage.setItem('past_medications', JSON.stringify(pastMeds));

  let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  med.startDate = new Date().toISOString().split('T')[0];
  delete med.endDate;
  currentMeds.push(med);
  localStorage.setItem('current_medications', JSON.stringify(currentMeds));

  loadMedications();
}

// Search Medications
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  loadMedications(query);
});

// Initial Load
loadMedications();
