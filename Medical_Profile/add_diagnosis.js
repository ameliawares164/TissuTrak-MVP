document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('diagnosis-form').addEventListener('submit', function (e) {
      e.preventDefault();
      saveDiagnosis();
    });
  });
  
  function goBack() {
    window.location.href = "profile_homepage.html";
  }
  
  function updateTitle() {
    const diagnosisName = document.getElementById('diagnosis-name').value.trim();
    const title = document.getElementById('dynamic-title');
    
    if (diagnosisName) {
      title.textContent = diagnosisName;
    } else {
      title.textContent = "Add a New Diagnosis";
    }
  }
  
  function saveDiagnosis() {
    const name = document.getElementById('diagnosis-name').value.trim();
    const date = document.getElementById('diagnosis-date').value.trim();
    const doctor = document.getElementById('doctor-name').value.trim();
    const notes = document.getElementById('notes').value.trim();
  
    if (!name) {
      alert("Please enter a Diagnosis Name.");
      return;
    }
  
    const diagnosis = {
      name: name,
      year: date ? new Date(date).getFullYear() : "Unknown",
      doctor: doctor,
      notes: notes,
      tags: [] // Empty for now since you removed tags
    };
  
    const existingDiagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
    existingDiagnoses.push(diagnosis);
    localStorage.setItem('diagnoses', JSON.stringify(existingDiagnoses));
  
    window.location.href = "profile_homepage.html";
  }
  