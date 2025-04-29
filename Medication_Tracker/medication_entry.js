// Elements
const backBtn = document.getElementById('back-btn');
const editBtn = document.getElementById('edit-btn');
const markTakenBtn = document.getElementById('mark-taken');
const stopMedBtn = document.getElementById('stop-med');
const editModal = document.getElementById('edit-modal');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

const medName = document.getElementById('med-name');
const medDosage = document.getElementById('med-dosage');
const startDate = document.getElementById('start-date');
const endDateContainer = document.getElementById('end-date-container');
const endDate = document.getElementById('end-date');
const purpose = document.getElementById('purpose');
const method = document.getElementById('method');
const times = document.getElementById('times');
const notes = document.getElementById('notes');

// Load medication
let selectedMedication = JSON.parse(localStorage.getItem('selected_medication'));

// Initial Render
function displayMedication() {
  medName.textContent = selectedMedication.name;
  medDosage.textContent = `${selectedMedication.dosage}, ${selectedMedication.frequency}`;
  startDate.textContent = selectedMedication.startDate;
  purpose.textContent = selectedMedication.purpose || "No purpose specified";
  method.textContent = selectedMedication.method || "No method specified";
  times.textContent = selectedMedication.times || "No times specified";
  notes.textContent = selectedMedication.notes || "No notes specified";

  if (selectedMedication.endDate) {
    endDateContainer.classList.remove('hidden');
    endDate.textContent = selectedMedication.endDate;
    stopMedBtn.textContent = "🔄 Start Medication";
  } else {
    endDateContainer.classList.add('hidden');
    stopMedBtn.textContent = "🚫 Stop Medication";
  }
}

// Back button
backBtn.addEventListener('click', () => {
  window.location.href = "medication_list.html";
});

// Edit Button
editBtn.addEventListener('click', () => {
  document.getElementById('edit-name').value = selectedMedication.name;
  document.getElementById('edit-dosage').value = selectedMedication.dosage;
  document.getElementById('edit-frequency').value = selectedMedication.frequency;
  document.getElementById('edit-purpose').value = selectedMedication.purpose;
  document.getElementById('edit-method').value = selectedMedication.method;
  document.getElementById('edit-times').value = selectedMedication.times;
  document.getElementById('edit-notes').value = selectedMedication.notes;
  editModal.classList.remove('hidden');
});

// Save Edit
saveEditBtn.addEventListener('click', () => {
  selectedMedication.name = document.getElementById('edit-name').value;
  selectedMedication.dosage = document.getElementById('edit-dosage').value;
  selectedMedication.frequency = document.getElementById('edit-frequency').value;
  selectedMedication.purpose = document.getElementById('edit-purpose').value;
  selectedMedication.method = document.getElementById('edit-method').value;
  selectedMedication.times = document.getElementById('edit-times').value;
  selectedMedication.notes = document.getElementById('edit-notes').value;

  let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  const index = currentMeds.findIndex(m => m.id === selectedMedication.id);
  if (index !== -1) {
    currentMeds[index] = selectedMedication;
    localStorage.setItem('current_medications', JSON.stringify(currentMeds));
  }

  localStorage.setItem('selected_medication', JSON.stringify(selectedMedication));

  displayMedication();
  editModal.classList.add('hidden');
});

// Cancel Edit
cancelEditBtn.addEventListener('click', () => {
  editModal.classList.add('hidden');
});

// Mark Taken
markTakenBtn.addEventListener('click', () => {
  const logs = JSON.parse(localStorage.getItem('medication_logs')) || [];
  logs.push({
    date: new Date().toISOString().split('T')[0],
    medName: selectedMedication.name,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    status: 'taken'
  });
  localStorage.setItem('medication_logs', JSON.stringify(logs));
  alert('Medication marked as taken!');
});

// Stop/Start Medication
stopMedBtn.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    if (!selectedMedication.endDate) {
      selectedMedication.endDate = new Date().toISOString().split('T')[0];
      let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
      currentMeds = currentMeds.filter(m => m.id !== selectedMedication.id);
      localStorage.setItem('current_medications', JSON.stringify(currentMeds));

      let pastMeds = JSON.parse(localStorage.getItem('past_medications')) || [];
      pastMeds.push(selectedMedication);
      localStorage.setItem('past_medications', JSON.stringify(pastMeds));
    } else {
      selectedMedication.startDate = new Date().toISOString().split('T')[0];
      delete selectedMedication.endDate;

      let pastMeds = JSON.parse(localStorage.getItem('past_medications')) || [];
      pastMeds = pastMeds.filter(m => m.id !== selectedMedication.id);
      localStorage.setItem('past_medications', JSON.stringify(pastMeds));

      let currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
      currentMeds.push(selectedMedication);
      localStorage.setItem('current_medications', JSON.stringify(currentMeds));
    }

    localStorage.setItem('selected_medication', JSON.stringify(selectedMedication));
    displayMedication();
  }
});

// Initial Load
displayMedication();
