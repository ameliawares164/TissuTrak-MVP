const weekDaysContainer = document.getElementById('week-days');
const monthYearDisplay = document.getElementById('month-year');
const fullCalendarBtn = document.getElementById('full-calendar-btn');
const fullCalendar = document.getElementById('full-calendar');
const todayContainer = document.getElementById('todays-meds');
const takenContainer = document.getElementById('taken-meds');
const backBtn = document.getElementById('back-btn');

let selectedDate = new Date();
let baseWeekDate = new Date();

// Back button
backBtn.addEventListener('click', () => {
  window.location.href = "medication_homepage.html";
});

// Render Week View
function renderWeek() {
  weekDaysContainer.innerHTML = '';

  const shownMonth = baseWeekDate.toLocaleString('default', { month: 'long' });
  const shownYear = baseWeekDate.getFullYear();
  monthYearDisplay.textContent = `${shownMonth} ${shownYear}`;

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseWeekDate);
    day.setDate(baseWeekDate.getDate() + i);

    const div = document.createElement('div');
    div.classList.add('week-day');
    div.dataset.date = day.toISOString();
    div.textContent = day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

    if (day.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]) {
      div.classList.add('active');
    }

    div.addEventListener('click', () => {
      selectedDate = new Date(div.dataset.date);
      renderWeek();
      loadMedicationsForSelectedDate();
    });

    weekDaysContainer.appendChild(div);
  }
}

// Render Full Calendar
function renderFullCalendar() {
  fullCalendar.innerHTML = '';

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Fill blank days
  for (let i = 0; i < startDay; i++) {
    const blank = document.createElement('div');
    blank.classList.add('calendar-day', 'blank-day');
    fullCalendar.appendChild(blank);
  }

  // Fill days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i);
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.textContent = i;

    if (day.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]) {
      dayDiv.classList.add('active-day');
    }

    dayDiv.addEventListener('click', () => {
      selectedDate = day;
      fullCalendar.classList.add('hidden');
      baseWeekDate = new Date(selectedDate);
      renderWeek();
      loadMedicationsForSelectedDate();
    });

    fullCalendar.appendChild(dayDiv);
  }
}

// Load Medications
function loadMedicationsForSelectedDate() {
  todayContainer.innerHTML = '';
  takenContainer.innerHTML = '';

  const todayString = selectedDate.toISOString().split('T')[0];
  const currentMeds = JSON.parse(localStorage.getItem('current_medications')) || [];
  const logs = JSON.parse(localStorage.getItem('medication_logs')) || [];

  const todayLogs = logs.filter(log => log.date === todayString);

  currentMeds.forEach(med => {
    const times = med.times ? med.times.split(',').map(t => t.trim()) : [];

    times.forEach(time => {
      const logged = todayLogs.find(log => log.medName === med.name && log.time === time);

      createMedicationCard(med, time, logged ? true : false, todayContainer);

      if (logged) {
        createMedicationCard(med, time, true, takenContainer);
      }
    });
  });
}

// Create Medication Card
function createMedicationCard(med, time, isLogged, container) {
  const card = document.createElement('div');
  card.classList.add('med-card');

  const info = document.createElement('div');
  info.classList.add('med-info');
  info.innerHTML = `
    <h3>${med.name}</h3>
    <p>🕒 ${time}</p>
  `;

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const logBtn = document.createElement('button');
  logBtn.classList.add('action-btn');
  logBtn.textContent = isLogged ? '✅' : 'Log Now';
  logBtn.classList.add(isLogged ? 'taken-btn' : 'log-now-btn');

  logBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLogMedication(med.name, time);
  });

  card.addEventListener('click', () => {
    localStorage.setItem('selected_medication', JSON.stringify(med));
    window.location.href = "medication_entry.html";
  });

  actions.appendChild(logBtn);
  card.appendChild(info);
  card.appendChild(actions);
  container.appendChild(card);
}

// Toggle Taken
function toggleLogMedication(medName, time) {
  const todayString = selectedDate.toISOString().split('T')[0];
  let logs = JSON.parse(localStorage.getItem('medication_logs')) || [];

  const logIndex = logs.findIndex(log =>
    log.date === todayString &&
    log.medName === medName &&
    log.time === time
  );

  if (logIndex !== -1) {
    logs.splice(logIndex, 1);
  } else {
    logs.push({
      date: todayString,
      medName: medName,
      time: time,
      status: 'taken'
    });
  }

  localStorage.setItem('medication_logs', JSON.stringify(logs));
  loadMedicationsForSelectedDate();
}

// Button actions
fullCalendarBtn.addEventListener('click', () => {
  fullCalendar.classList.toggle('hidden');
  if (!fullCalendar.classList.contains('hidden')) {
    renderFullCalendar();
  }
});

document.getElementById('prev-week').addEventListener('click', () => {
  baseWeekDate.setDate(baseWeekDate.getDate() - 7);
  renderWeek();
  loadMedicationsForSelectedDate();
});

document.getElementById('next-week').addEventListener('click', () => {
  baseWeekDate.setDate(baseWeekDate.getDate() + 7);
  renderWeek();
  loadMedicationsForSelectedDate();
});

// INIT
renderWeek();
loadMedicationsForSelectedDate();
