let vitalsData = JSON.parse(localStorage.getItem('vitalsData')) || []; // Load saved vitals from log_vitals
let currentPage = 1;
const entriesPerPage = 10;

function goBack() {
  window.location.href = "vitals_homepage.html";
}

function applyFilters() {
  currentPage = 1;
  displayVitals();
}

function displayVitals() {
  const list = document.getElementById('vitals-list');
  const noEntries = document.getElementById('no-entries');
  list.innerHTML = '';

  const dateFilter = document.getElementById('date-filter').value;
  const typeFilter = document.getElementById('vital-type-filter').value;

  const now = new Date();
  let filtered = vitalsData.filter(entry => {
    let entryDate = new Date(entry.datetime);
    if (dateFilter !== 'all') {
      let daysAgo = new Date();
      daysAgo.setDate(now.getDate() - parseInt(dateFilter));
      if (entryDate < daysAgo) return false;
    }
    if (typeFilter && entry.type !== typeFilter) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    noEntries.classList.remove('hidden');
    return;
  } else {
    noEntries.classList.add('hidden');
  }

  const start = (currentPage - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  const pageEntries = filtered.slice(start, end);

  pageEntries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'vital-entry';
    div.onclick = () => viewEntry(entry);

    div.innerHTML = `
      <div class="vital-bold">${formatType(entry.type)}: ${entry.value}</div>
      <div class="vital-time">${formatDate(entry.datetime)}</div>
      <div class="entry-actions">
        <button onclick="editEntry(event, ${entry.id})">📝 Edit</button>
        <button onclick="deleteEntry(event, ${entry.id})">🗑️ Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function nextPage() {
  currentPage++;
  displayVitals();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayVitals();
  }
}

function editEntry(event, id) {
  event.stopPropagation();
  const newValue = prompt("Enter the new vital value:");
  if (newValue) {
    const index = vitalsData.findIndex(e => e.id === id);
    if (index !== -1) {
      vitalsData[index].value = newValue;
      localStorage.setItem('vitalsData', JSON.stringify(vitalsData));
      displayVitals();
    }
  }
}

function deleteEntry(event, id) {
  event.stopPropagation();
  if (confirm('Are you sure you want to delete this vital entry?')) {
    vitalsData = vitalsData.filter(entry => entry.id !== id);
    localStorage.setItem('vitalsData', JSON.stringify(vitalsData));
    displayVitals();
  }
}

function formatDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString();
}

function formatType(type) {
  switch (type) {
    case 'bloodPressure': return 'Blood Pressure';
    case 'heartRate': return 'Heart Rate';
    case 'respiratoryRate': return 'Respiratory Rate';
    case 'oxygenSaturation': return 'Oxygen Saturation';
    case 'temperature': return 'Temperature';
    case 'weight': return 'Weight';
    case 'bloodGlucose': return 'Blood Glucose';
    default: return 'Vital';
  }
}

function viewEntry(entry) {
  localStorage.setItem('currentVitalEntry', JSON.stringify(entry));
  window.location.href = "vitals_entry.html";
}

function exportVitals() {
  const filteredEntries = document.querySelectorAll('.vital-entry');
  let content = "";
  filteredEntries.forEach(entry => {
    content += entry.innerText + "\\n\\n";
  });

  const win = window.open();
  win.document.write('<pre>' + content + '</pre>');
  win.print();
  win.close();
}

displayVitals();
