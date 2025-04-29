function addAppointment() {
    window.location.href = "add_appointment.html";
  }
  
  function goHome() {
    window.location.href = "homepage.html";
  }
  
  function goSymptoms() {
    window.location.href = "symptom_homepage.html";
  }
  
  function goReports() {
    window.location.href = "reports_homepage.html";
  }
  
  function goProfile() {
    window.location.href = "profile_homepage.html";
  }
  
  // Helper: format date as MM/DD/YYYY
  // Helper: format date to MM/DD/YYYY for display only
function formatDate(dateStr) {
    const parts = dateStr.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]}`; // MM/DD/YYYY
  }
  
  
  // Helper: format time as 12-hour clock with AM/PM
  function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const newHour = hour % 12 || 12;
    return `${newHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }
  
  // Load and display upcoming appointments
  function loadAppointments() {
    const list = document.getElementById('appointments-list');
    list.innerHTML = '';
  
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
    const now = new Date();
  
    // Filter out appointments older than 24 hours
    appointments = appointments.filter(app => {
      const appointmentDateTime = new Date(app.date + ' ' + app.time);
      return appointmentDateTime.getTime() + (24 * 60 * 60 * 1000) > now.getTime();
    });
  
    // Sort appointments by soonest
    appointments.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time));
  
    if (appointments.length === 0) {
      list.innerHTML = "<p>No upcoming appointments.</p>";
      return;
    }
  
    appointments.forEach((app, index) => {
      const card = document.createElement('div');
      card.className = 'appointment-card';
      card.innerHTML = `
        <strong>${app.provider}</strong><br>
        ${formatDate(app.date)} - ${formatTime(app.time)}<br>
        ${app.reason}
      `;
      card.onclick = function() {
        localStorage.setItem('selectedAppointmentIndex', index);
        window.location.href = "appointment_entry.html";
      };
      list.appendChild(card);
    });
  }
  
  // Calendar
  let selectedDate = new Date();
  let currentMonth = selectedDate.getMonth();
  let currentYear = selectedDate.getFullYear();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendar-month-year');
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    calendarTitle.innerText = `${monthNames[month]} ${year}`;
    calendar.innerHTML = '';
  
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendar.appendChild(emptyCell);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElem = document.createElement('div');
      dayElem.className = 'calendar-day';
      dayElem.innerText = day;
  
      const today = new Date();
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayElem.classList.add('today');
      }
  
      if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
        dayElem.classList.add('selected');
      }
  
      dayElem.onclick = function() {
        selectedDate = new Date(year, month, day);
        generateCalendar(month, year);
        showAppointmentsForSelectedDate();
      };
  
      calendar.appendChild(dayElem);
    }
  }
  
  // Show appointments when clicking a date
  function showAppointmentsForSelectedDate() {
    const selectedList = document.getElementById('selected-date-appointments');
    selectedList.innerHTML = '';
  
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Correct: format selected date into YYYY-MM-DD
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const selectedDateString = `${yyyy}-${mm}-${dd}`; // 💥 now matches your saved data!
  
    // Find appointments matching selected date
    const matchingAppointments = allAppointments.filter(app => {
      return app.date === selectedDateString;
    });
  
    if (matchingAppointments.length === 0) {
      selectedList.innerHTML = "<p>No appointments scheduled for this date.</p>";
      return;
    }
  
    matchingAppointments.sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time));
  
    matchingAppointments.forEach((app, index) => {
      const card = document.createElement('div');
      card.className = 'appointment-card';
      card.innerHTML = `
        <strong>${app.provider}</strong><br>
        ${formatDate(app.date)} - ${formatTime(app.time)}<br>
        ${app.reason}
      `;
      card.onclick = function() {
        localStorage.setItem('selectedAppointmentIndex', index);
        window.location.href = "appointment_entry.html";
      };
      selectedList.appendChild(card);
    });
  }
  
  
  function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
    showAppointmentsForSelectedDate();
  }
  
  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
    showAppointmentsForSelectedDate();
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    generateCalendar(currentMonth, currentYear);
    showAppointmentsForSelectedDate();
  });
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
  