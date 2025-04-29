function goBack() {
    window.location.href = "appointment_homepage.html";
  }
  
  function handleReasonChange() {
    const reasonSelect = document.getElementById('reason');
    const otherReasonContainer = document.getElementById('other-reason-container');
  
    if (reasonSelect.value === 'Other') {
      otherReasonContainer.style.display = 'block';
    } else {
      otherReasonContainer.style.display = 'none';
    }
  }
  
  // Save Appointment
  document.addEventListener('DOMContentLoaded', () => {
    const isEditMode = localStorage.getItem('editMode');
    const editIndex = localStorage.getItem('editAppointmentIndex');
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
    if (isEditMode === 'true' && editIndex !== null && appointments[editIndex]) {
      const appointment = appointments[editIndex];
  
      // Prefill the form fields
      document.getElementById('date').value = appointment.date || '';
      document.getElementById('time').value = appointment.time || '';
      document.getElementById('provider').value = appointment.provider || '';
      document.getElementById('location').value = appointment.location || '';
      document.getElementById('reason').value = appointment.reason || '';
      document.getElementById('notes').value = appointment.notes || '';
    }
  });
  