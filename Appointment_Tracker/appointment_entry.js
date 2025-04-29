function goBack() {
    window.location.href = "appointment_homepage.html";
  }
  
  // Load appointment details from localStorage
  function loadAppointmentDetails() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const selectedAppointmentIndex = localStorage.getItem('selectedAppointmentIndex');
  
    if (selectedAppointmentIndex !== null && appointments[selectedAppointmentIndex]) {
      const appointment = appointments[selectedAppointmentIndex];
  
      document.getElementById('provider-name').innerText = appointment.provider || '';
      document.getElementById('appointment-location').innerText = appointment.location || 'N/A';
      document.getElementById('appointment-datetime').innerText = formatDate(appointment.date) + ' - ' + formatTime(appointment.time);
      document.getElementById('appointment-reason').innerText = appointment.reason || 'N/A';
      document.getElementById('appointment-notes').innerText = appointment.notes || 'No notes added.';
    }
  }
  
  // Helper: Format date to MM/DD/YYYY for display
  function formatDate(dateStr) {
    if (!dateStr.includes("-")) return dateStr; // Already formatted
    const parts = dateStr.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]}`; // MM/DD/YYYY
  }
  
  // Helper: Format time to 12-hour clock with AM/PM
  function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const newHour = hour % 12 || 12;
    return `${newHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }
  
  // Edit appointment: Enable edit mode and navigate to Add Appointment screen
  function editAppointment() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const selectedAppointmentIndex = localStorage.getItem('selectedAppointmentIndex');
  
    if (selectedAppointmentIndex !== null && appointments[selectedAppointmentIndex]) {
      localStorage.setItem('editMode', 'true');
      localStorage.setItem('editAppointmentIndex', selectedAppointmentIndex);
      window.location.href = "add_appointment.html";
    }
  }
  
  // Delete appointment
  function deleteAppointment() {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const selectedAppointmentIndex = localStorage.getItem('selectedAppointmentIndex');
  
      if (selectedAppointmentIndex !== null && appointments[selectedAppointmentIndex]) {
        appointments.splice(selectedAppointmentIndex, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        alert('Appointment deleted!');
        window.location.href = "appointment_homepage.html";
      }
    }
  }
  
  // Initialize page
  document.addEventListener('DOMContentLoaded', () => {
    loadAppointmentDetails();
  });
  