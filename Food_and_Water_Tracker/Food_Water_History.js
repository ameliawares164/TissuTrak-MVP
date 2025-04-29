let allLogs = [];
let currentPage = 1;
const entriesPerPage = 10;

// Load all entries initially
function loadEntries() {
  const foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || [];
  const waterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];

  allLogs = [...foodLogs.map(log => ({ ...log, type: 'food' })), 
             ...waterLogs.map(log => ({ ...log, type: 'water' }))];

  allLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderEntries();
}

// Render Entries based on current page, search and filters
function renderEntries() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const dateFilterValue = document.getElementById('dateFilter').value;
  const now = new Date();
  
  let filteredLogs = allLogs.filter(log => {
    // Search filter
    const text = `${log.mealName || ""} ${log.waterType || ""} ${log.foodItems ? log.foodItems.join(' ') : ""}`.toLowerCase();
    const matchesSearch = text.includes(searchValue);

    // Date filter
    let matchesDate = true;
    if (dateFilterValue !== 'all') {
      const daysAgo = parseInt(dateFilterValue);
      const logDate = new Date(log.date);
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      matchesDate = logDate >= cutoffDate;
    }

    return matchesSearch && matchesDate;
  });

  const entriesList = document.getElementById('entriesList');
  entriesList.innerHTML = '';

  const start = (currentPage - 1) * entriesPerPage;
  const paginatedLogs = filteredLogs.slice(start, start + entriesPerPage);

  if (paginatedLogs.length === 0) {
    entriesList.innerHTML = '<p style="text-align: center; margin-top: 20px;">No entries found.</p>';
  } else {
    paginatedLogs.forEach((log) => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('entry');

      entryDiv.innerHTML = `
        <div class="entry-left">
          <p class="entry-type">${log.type === 'food' ? '🍴 Food' : '💧 Water'}</p>
          <p><strong>${log.type === 'food' ? log.mealType : log.waterType}</strong></p>
          <p>${log.date} ${log.time || ''}</p>
          <p>${log.type === 'food' ? `Ingredients: ${log.foodItems ? log.foodItems.join(', ') : 'N/A'}` : `Amount: ${log.quantity} ${log.unit}`}</p>
        </div>
        <div class="entry-actions">
          <button class="editBtn" data-id="${allLogs.indexOf(log)}" data-type="${log.type}">✏️</button>
          <button class="deleteBtn" data-id="${allLogs.indexOf(log)}" data-type="${log.type}">🗑️</button>
        </div>
      `;

      entryDiv.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') { // Only if clicking outside buttons
          if (log.type === 'food') {
            localStorage.setItem('selectedFoodEntry', JSON.stringify(log));
            window.location.href = 'food_entry.html';
          } else {
            localStorage.setItem('selectedWaterEntry', JSON.stringify(log));
            window.location.href = 'water_entry.html';
          }
        }
      });

      entriesList.appendChild(entryDiv);
    });
  }

  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);
  document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.max(totalPages, 1)}`;

  attachActionListeners();
}

// Attach Edit and Delete listeners
function attachActionListeners() {
  const editBtns = document.querySelectorAll('.editBtn');
  const deleteBtns = document.querySelectorAll('.deleteBtn');

  editBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent opening entry
      const index = this.dataset.id;
      const log = allLogs[index];

      if (log.type === 'food') {
        localStorage.setItem('selectedFoodEntry', JSON.stringify(log));
        window.location.href = 'food_entry.html';
      } else {
        localStorage.setItem('selectedWaterEntry', JSON.stringify(log));
        window.location.href = 'water_entry.html';
      }
    });
  });

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent opening entry
      const index = this.dataset.id;
      const log = allLogs[index];

      if (confirm('Are you sure you want to delete this entry?')) {
        if (log.type === 'food') {
          let foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || [];
          foodLogs = foodLogs.filter(f => JSON.stringify(f) !== JSON.stringify(log));
          localStorage.setItem('foodLogs', JSON.stringify(foodLogs));
        } else {
          let waterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];
          waterLogs = waterLogs.filter(w => JSON.stringify(w) !== JSON.stringify(log));
          localStorage.setItem('waterLogs', JSON.stringify(waterLogs));
        }

        loadEntries();
      }
    });
  });
}

// Export to PDF
function exportToPDF() {
  const foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || [];
  const waterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];

  let pdfContent = "TissuTrak - Full Food and Water History\n\n";

  const combinedLogs = [...foodLogs.map(log => ({ ...log, type: 'food' })),
                        ...waterLogs.map(log => ({ ...log, type: 'water' }))];

  combinedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  combinedLogs.forEach(log => {
    pdfContent += `${log.type === 'food' ? '🍴 Food' : '💧 Water'}\n`;
    pdfContent += `${log.type === 'food' ? log.mealType : log.waterType}\n`;
    pdfContent += `${log.date} ${log.time || ''}\n`;
    pdfContent += `${log.type === 'food' ? `Ingredients: ${log.foodItems ? log.foodItems.join(', ') : 'N/A'}` : `Amount: ${log.quantity} ${log.unit}`}\n`;
    pdfContent += `\n-------------------------\n\n`;
  });

  const pdfWindow = window.open('');
  pdfWindow.document.write('<pre>' + pdfContent + '</pre>');
  pdfWindow.print();
}

// Pagination Buttons
document.getElementById('prevPageBtn').addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    renderEntries();
  }
});

document.getElementById('nextPageBtn').addEventListener('click', function() {
  const totalEntries = allLogs.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderEntries();
  }
});

// Other Button Listeners
document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'food_homepage.html';
});

document.getElementById('exportBtn').addEventListener('click', function() {
  exportToPDF();
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

// Filters
document.getElementById('searchInput').addEventListener('input', function() {
  currentPage = 1;
  renderEntries();
});

document.getElementById('dateFilter').addEventListener('change', function() {
  currentPage = 1;
  renderEntries();
});

// Initialize
loadEntries();
