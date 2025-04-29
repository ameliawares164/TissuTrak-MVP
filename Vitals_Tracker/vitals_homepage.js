function logVitals() {
    window.location.href = "log_vitals.html";
  }
  
  function viewHistory() {
    window.location.href = "vitals_history.html";
  }
  
  // Load today's most recent Blood Pressure and Heart Rate
  function loadTodayVitals() {
    const vitalsData = JSON.parse(localStorage.getItem('vitalsData')) || [];
    const todayVitals = {};
    
    const sorted = vitalsData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  
    for (const entry of sorted) {
      if (!todayVitals[entry.type]) {
        todayVitals[entry.type] = entry.value;
      }
      if (todayVitals.bloodPressure && todayVitals.heartRate) break;
    }
  
    const vitalsGrid = document.getElementById('today-vitals');
    vitalsGrid.innerHTML = `
      <div class="vital-card">
        <p class="vital-title">Blood Pressure</p>
        <p class="vital-value">${todayVitals.bloodPressure || '--'} <span>mmHg</span></p>
      </div>
      <div class="vital-card">
        <p class="vital-title">Heart Rate</p>
        <p class="vital-value">${todayVitals.heartRate || '--'} <span>bpm</span></p>
      </div>
    `;
  }
  
  // Load 5 most recent entries
  function loadRecentEntries() {
    const vitalsData = JSON.parse(localStorage.getItem('vitalsData')) || [];
    const recentEntriesContainer = document.getElementById('recent-entries');
    recentEntriesContainer.innerHTML = '';
  
    const sorted = vitalsData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    const recent = sorted.slice(0, 5);
  
    recent.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'entry-card';
      entryDiv.onclick = () => {
        localStorage.setItem('currentVitalEntry', JSON.stringify(entry));
        window.location.href = "vitals_entry.html";
      };
      const time = new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      entryDiv.innerHTML = `
        ${formatType(entry.type)}: ${entry.value} <span class="timestamp">${time}</span>
      `;
      recentEntriesContainer.appendChild(entryDiv);
    });
  }
  
  // Load visual trends for past 3 months
  function loadTrendCharts() {
    const vitalsData = JSON.parse(localStorage.getItem('vitalsData')) || [];
  
    // Only look at the last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    const filtered = vitalsData.filter(entry => new Date(entry.datetime) >= threeMonthsAgo);
  
    // Sort entries in the order they were saved (by ID) — NOT datetime!
    const sorted = filtered.sort((a, b) => a.id - b.id);
  
    const labels = sorted.map((_, index) => `Entry ${index + 1}`); // Just Entry 1, Entry 2, Entry 3, etc.
  
    const heartRateData = sorted
      .filter(entry => entry.type === 'heartRate')
      .map(entry => parseFloat(entry.value));
  
    const bloodPressureData = sorted
      .filter(entry => entry.type === 'bloodPressure')
      .map(entry => {
        const parts = entry.value.split('/');
        return parseInt(parts[0]); // Systolic only
      });
  
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
  
    new Chart(heartRateCtx, {
      type: 'line',
      data: {
        labels: labels.slice(0, heartRateData.length), // Match heart rate points
        datasets: [{
          label: 'Heart Rate',
          data: heartRateData,
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
  
    new Chart(bloodPressureCtx, {
      type: 'line',
      data: {
        labels: labels.slice(0, bloodPressureData.length), // Match BP points
        datasets: [{
          label: 'Systolic BP',
          data: bloodPressureData,
          borderColor: '#ff6384',
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
  
  // Initialize everything
  loadTodayVitals();
  loadRecentEntries();
  loadTrendCharts();
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
  