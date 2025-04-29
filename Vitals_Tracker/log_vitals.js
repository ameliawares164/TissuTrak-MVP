// Navigate back to Vitals Homepage
function goBack() {
    window.location.href = "vitals_homepage.html";
  }
  
  // Show relevant input fields based on selection
  function showVitalInputs() {
    const type = document.getElementById('vital-type').value;
    const inputsContainer = document.getElementById('vital-inputs');
    inputsContainer.innerHTML = '';
  
    if (type === "bloodPressure") {
      inputsContainer.innerHTML = `
        <div class="input-label">Systolic</div>
        <div class="input-group"><input type="text" id="systolic" placeholder="e.g., 120"></div>
        <div class="input-label">Diastolic</div>
        <div class="input-group"><input type="text" id="diastolic" placeholder="e.g., 80"></div>
      `;
    } else if (type === "heartRate") {
      inputsContainer.innerHTML = `
        <div class="input-label">Heart Rate (bpm)</div>
        <div class="input-group"><input type="text" id="heart-rate" placeholder="e.g., 75"></div>
      `;
    } else if (type === "respiratoryRate") {
      inputsContainer.innerHTML = `
        <div class="input-label">Respiratory Rate (breaths/min)</div>
        <div class="input-group"><input type="text" id="respiratory-rate" placeholder="e.g., 16"></div>
      `;
    } else if (type === "oxygenSaturation") {
      inputsContainer.innerHTML = `
        <div class="input-label">Oxygen Saturation (%)</div>
        <div class="input-group"><input type="text" id="oxygen-saturation" placeholder="e.g., 98"></div>
      `;
    } else if (type === "temperature") {
      inputsContainer.innerHTML = `
        <div class="input-label">Temperature (°F or °C)</div>
        <div class="input-group"><input type="text" id="temperature" placeholder="e.g., 98.6"></div>
      `;
    } else if (type === "weight") {
      inputsContainer.innerHTML = `
        <div class="input-label">Weight (lbs or kg)</div>
        <div class="input-group"><input type="text" id="weight" placeholder="e.g., 140"></div>
      `;
    } else if (type === "bloodGlucose") {
      inputsContainer.innerHTML = `
        <div class="input-label">Blood Glucose (mg/dL)</div>
        <div class="input-group"><input type="text" id="blood-glucose" placeholder="e.g., 90"></div>
      `;
    }
  }
  
  function saveVitals() {
    const datetime = document.getElementById('datetime').value;
    const type = document.getElementById('vital-type').value;
    const notes = document.getElementById('notes').value;
  
    if (!datetime || !type) {
      alert("Please fill out the time and vital type!");
      return;
    }
  
    let value = "";
  
    // Correct mapping based on type
    if (type === "bloodPressure") {
      const systolic = document.getElementById('systolic').value;
      const diastolic = document.getElementById('diastolic').value;
      if (!systolic || !diastolic) {
        alert("Please enter both systolic and diastolic values.");
        return;
      }
      value = `${systolic}/${diastolic}`;
    } else if (type === "heartRate") {
      value = document.getElementById('heart-rate').value;
    } else if (type === "respiratoryRate") {
      value = document.getElementById('respiratory-rate').value;
    } else if (type === "oxygenSaturation") {
      value = document.getElementById('oxygen-saturation').value;
    } else if (type === "temperature") {
      value = document.getElementById('temperature').value;
    } else if (type === "weight") {
      value = document.getElementById('weight').value;
    } else if (type === "bloodGlucose") {
      value = document.getElementById('blood-glucose').value;
    }
  
    if (!value) {
      alert("Please enter a value for the selected vital.");
      return;
    }
  
    const newEntry = {
      id: Date.now(),
      datetime: datetime,
      type: type,
      value: value,
      notes: notes
    };
  
    const vitalsData = JSON.parse(localStorage.getItem('vitalsData')) || [];
    vitalsData.push(newEntry);
    localStorage.setItem('vitalsData', JSON.stringify(vitalsData));
  
    window.location.href = "vitals_homepage.html";
  }
  