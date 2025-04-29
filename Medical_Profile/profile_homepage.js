document.addEventListener("DOMContentLoaded", function () {
    loadPersonalInfo();
    loadDiagnoses();
  });
  
  function loadPersonalInfo() {
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo')) || {
      name: "John Doe",
      dob: "15/03/1985",
      gender: "Male",
      contact: "+1 234 567 8900"
    };
  
    document.getElementById('user-name').textContent = personalInfo.name;
    document.getElementById('user-dob').textContent = personalInfo.dob;
    document.getElementById('user-gender').textContent = personalInfo.gender;
    document.getElementById('user-contact').textContent = personalInfo.contact;
  }
  
  function loadDiagnoses() {
    const diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
    const container = document.getElementById('medical-conditions-list');
    container.innerHTML = '';
  
    if (diagnoses.length === 0) {
      container.innerHTML = '<div class="entry">No diagnoses added yet.</div>';
      return;
    }
  
    diagnoses.forEach((diagnosis, index) => {
      const div = document.createElement('div');
      div.className = 'entry';
      div.innerHTML = `
        ${diagnosis.name}<br><small>Diagnosed: ${diagnosis.year || 'Unknown'}</small>
      `;
      div.onclick = function() {
        openDiagnosisDetail(index);
      };
      container.appendChild(div);
    });
  }
  
  function openDiagnosisDetail(index) {
    localStorage.setItem('selectedDiagnosisIndex', index);
    window.location.href = "diagnosis_details.html";
  }
  
  function navigateTo(page) {
    window.location.href = page;
  }
  
  function navigateToAddDiagnosis() {
    localStorage.removeItem('selectedDiagnosisIndex'); // Clear selected if adding new
    window.location.href = 'add_diagnosis.html';
  }
  
  function editPersonalInfo() {
    window.location.href = 'edit_personal_info.html';
  }
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
  