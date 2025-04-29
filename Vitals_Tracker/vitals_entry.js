const vitalEntry = JSON.parse(localStorage.getItem('currentVitalEntry'));
const allVitals = JSON.parse(localStorage.getItem('vitalsData')) || [];

if (vitalEntry) {
  document.getElementById('entry-date').textContent = formatDateTime(vitalEntry.datetime);
  document.getElementById('vital-value').textContent = vitalEntry.value;
  document.getElementById('vital-notes').textContent = vitalEntry.notes || 'No notes added.';
  document.getElementById('vital-range').textContent = vitalEntry.range || 'Normal Range';

  const icon = document.getElementById('vital-icon');
  switch (vitalEntry.type) {
    case 'heartRate': icon.textContent = '❤️'; break;
    case 'bloodPressure': icon.textContent = '🩺'; break;
    case 'respiratoryRate': icon.textContent = '🌬️'; break;
    case 'oxygenSaturation': icon.textContent = '🫁'; break;
    case 'temperature': icon.textContent = '🌡️'; break;
    case 'weight': icon.textContent = '⚖️'; break;
    case 'bloodGlucose': icon.textContent = '🩸'; break;
    default: icon.textContent = '❤️';
  }

  createTrendChart(vitalEntry.type);
}

function formatDateTime(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function goBack() {
  window.location.href = "vitals_homepage.html";
}

function editEntry() {
  const newValue = prompt("Enter the new value:");
  if (newValue) {
    vitalEntry.value = newValue;
    localStorage.setItem('currentVitalEntry', JSON.stringify(vitalEntry));

    let vitals = JSON.parse(localStorage.getItem('vitalsData')) || [];
    const index = vitals.findIndex(v => v.id === vitalEntry.id);
    if (index !== -1) {
      vitals[index].value = newValue;
      localStorage.setItem('vitalsData', JSON.stringify(vitals));
    }

    alert('Vital updated!');
    location.reload();
  }
}

function deleteEntry() {
  if (confirm('Are you sure you want to delete this vital entry?')) {
    let vitals = JSON.parse(localStorage.getItem('vitalsData')) || [];
    vitals = vitals.filter(v => v.id !== vitalEntry.id);
    localStorage.setItem('vitalsData', JSON.stringify(vitals));
    localStorage.removeItem('currentVitalEntry');
    window.location.href = "vitals_homepage.html";
  }
}

// Create Trend Chart
function createTrendChart(vitalType) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const allVitals = JSON.parse(localStorage.getItem('vitalsData')) || [];
  
    const filtered = allVitals
      .filter(entry => entry.type === vitalType)
      .sort((a, b) => a.id - b.id); // Sort by entry ID not datetime
  
    const labels = filtered.map((_, index) => `Entry ${index + 1}`);
  
    const data = filtered.map(entry => {
      if (vitalType === 'bloodPressure') {
        const parts = entry.value.split('/');
        return parseInt(parts[0]); // Systolic for BP
      }
      return parseFloat(entry.value);
    });
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: formatType(vitalType),
          data: data,
          borderColor: '#00b394',
          backgroundColor: 'transparent',
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: false }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
  
  
function formatType(type) {
  switch (type) {
    case 'bloodPressure': return 'Blood Pressure (Systolic)';
    case 'heartRate': return 'Heart Rate';
    case 'respiratoryRate': return 'Respiratory Rate';
    case 'oxygenSaturation': return 'Oxygen Saturation';
    case 'temperature': return 'Temperature';
    case 'weight': return 'Weight';
    case 'bloodGlucose': return 'Blood Glucose';
    default: return 'Vital';
  }
}
