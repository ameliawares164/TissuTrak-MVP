document.addEventListener("DOMContentLoaded", function () {
    loadPersonalInfo();
  
    document.getElementById('personal-info-form').addEventListener('submit', function (e) {
      e.preventDefault();
      savePersonalInfo();
    });
  });
  
  function loadPersonalInfo() {
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo')) || {
      name: "",
      dob: "",
      gender: "",
      contact: ""
    };
  
    document.getElementById('name').value = personalInfo.name;
    document.getElementById('dob').value = personalInfo.dob;
    document.getElementById('gender').value = personalInfo.gender;
    document.getElementById('contact').value = personalInfo.contact;
  }
  
  function savePersonalInfo() {
    const updatedInfo = {
      name: document.getElementById('name').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      contact: document.getElementById('contact').value
    };
  
    localStorage.setItem('personalInfo', JSON.stringify(updatedInfo));
    window.location.href = 'profile_homepage.html';
  }
  
  function goBack() {
    window.location.href = 'profile_homepage.html';
  }
  