document.addEventListener("DOMContentLoaded", function () {
  loadDiagnoses();
});

function goBack() {
  localStorage.removeItem('selectedDiagnosisIndex');
  window.location.href = "profile_homepage.html";
}

function addNewDiagnosis() {
  localStorage.removeItem('selectedDiagnosisIndex');
  window.location.href = "add_diagnosis.html";
}

function loadDiagnoses() {
  const diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
  const selectedIndex = localStorage.getItem('selectedDiagnosisIndex');
  const listContainer = document.getElementById('diagnosis-list');
  const title = document.getElementById('diagnosis-title');
  listContainer.innerHTML = '';

  if (diagnoses.length === 0) {
    listContainer.innerHTML = '<p>No diagnoses found. Please add one!</p>';
    return;
  }

  if (selectedIndex !== null) {
    const diagnosis = diagnoses[selectedIndex];
    title.textContent = `${diagnosis.name} Details`;
    createDiagnosisEntry(diagnosis, selectedIndex);
  } else {
    title.textContent = "Diagnoses Details";
    diagnoses.forEach((diagnosis, index) => {
      createDiagnosisEntry(diagnosis, index);
    });
  }
}

function createDiagnosisEntry(diagnosis, index) {
  const entry = document.createElement('div');
  entry.className = 'diagnosis-entry';
  entry.innerHTML = `
    <label>Diagnosis Name</label>
    <input type="text" value="${diagnosis.name}" id="name-${index}" />

    <label>Date of Diagnosis</label>
    <input type="date" value="${formatDateForInput(diagnosis.date || '')}" id="date-${index}" />

    <label>Treating Physician</label>
    <input type="text" value="${diagnosis.doctor || ''}" id="doctor-${index}" />

    <label>Diagnostic Tests</label>
    <input type="text" value="${diagnosis.tests || ''}" id="tests-${index}" />

    <button class="edit-button" onclick="saveDiagnosis(${index})">✏️ Save Changes</button>
  `;
  document.getElementById('diagnosis-list').appendChild(entry);
}

function saveDiagnosis(index) {
  const diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];

  const updatedDiagnosis = {
    name: document.getElementById(`name-${index}`).value.trim(),
    date: document.getElementById(`date-${index}`).value.trim(),
    doctor: document.getElementById(`doctor-${index}`).value.trim(),
    tests: document.getElementById(`tests-${index}`).value.trim(),
    notes: diagnoses[index].notes || '',
    tags: diagnoses[index].tags || []
  };

  diagnoses[index] = updatedDiagnosis;
  localStorage.setItem('diagnoses', JSON.stringify(diagnoses));

  alert('Diagnosis updated successfully!');
  window.location.href = "profile_homepage.html";
}

function formatDateForInput(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return '';
  return d.toISOString().split('T')[0];
}
