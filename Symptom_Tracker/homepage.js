// Fetch all symptoms from localStorage
function fetchSymptoms() {
    return JSON.parse(localStorage.getItem('symptoms')) || [];
  }
  
  // Display symptoms (5 most recent)
  function displaySymptoms(entries) {
    const container = document.getElementById('recent-entries');
    const noResults = document.getElementById('no-results');
  
    container.innerHTML = ''; // Clear old results
  
    if (entries.length === 0) {
      noResults.classList.remove('hidden');
      return;
    } else {
      noResults.classList.add('hidden');
    }
  
    // Limit to 5 most recent entries
    const recentEntries = entries
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      .slice(0, 5);
  
    recentEntries.forEach((entry, index) => {
      const div = document.createElement('div');
      div.className = 'entry';
      div.innerHTML = `
        <h4>${entry.symptomName}</h4>
        <p>Severity: ${entry.severity}</p>
        <p class="time">${new Date(entry.datetime).toLocaleString()}</p>
      `;
  
      // On click, save selected symptom index and go to detail page
      div.addEventListener('click', () => {
        const fullList = fetchSymptoms();
        const realIndex = fullList.findIndex(symptom => symptom.datetime === entry.datetime && symptom.symptomName === entry.symptomName);
        localStorage.setItem('selectedSymptomIndex', realIndex);
        window.location.href = 'Symptom_Detail.html';
      });
  
      container.appendChild(div);
    });
  }
  
  // Search symptoms live
  document.getElementById("search-input").addEventListener("input", () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const allSymptoms = fetchSymptoms();
    
    const filtered = allSymptoms.filter(symptom => 
      symptom.symptomName.toLowerCase().includes(query)
    );
  
    displaySymptoms(filtered);
  });
  
  // On page load, show the 5 most recent
  window.onload = function() {
    const symptoms = fetchSymptoms();
    displaySymptoms(symptoms);
  };
  function goHome() {
    window.location.href = "homescreens/homescreen.html";
  }
  
  function goToSymptoms() {
    window.location.href = "symptom_tracker/homepage.html";
  }
  
  function goToReports() {
    window.location.href = "reports.html";
  }
  
  function goToProfile() {
    window.location.href = "medical_profile/profile_homepage.html";
  }
  