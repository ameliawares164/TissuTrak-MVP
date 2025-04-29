// Load the selected water entry
const selectedWaterEntry = JSON.parse(localStorage.getItem('selectedWaterEntry'));

function displayWaterEntry() {
  if (!selectedWaterEntry) {
    document.getElementById('waterEntryDetails').innerHTML = `<p>No Water Entry Found.</p>`;
    return;
  }

  document.getElementById('waterEntryDetails').innerHTML = `
    <h2>${selectedWaterEntry.waterType}</h2>
    <p><strong>Date:</strong> ${selectedWaterEntry.date}</p>
    <p><strong>Time:</strong> ${selectedWaterEntry.time}</p>

    <h3>Quantity</h3>
    <p>💧 ${selectedWaterEntry.quantity} ${selectedWaterEntry.unit}</p>

    ${selectedWaterEntry.nutrients && (selectedWaterEntry.nutrients.electrolytes || selectedWaterEntry.nutrients.vitamins || selectedWaterEntry.nutrients.minerals) ? `
      <h3>Nutrients</h3>
      <ul>
        ${selectedWaterEntry.nutrients.electrolytes ? "<li>⚡ Electrolytes</li>" : ""}
        ${selectedWaterEntry.nutrients.vitamins ? "<li>🧬 Vitamins</li>" : ""}
        ${selectedWaterEntry.nutrients.minerals ? "<li>🪨 Minerals</li>" : ""}
      </ul>
    ` : ""}

    <h3>Notes</h3>
    <p>${selectedWaterEntry.notes || "No notes provided."}</p>
  `;
}

// Back Button
document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'food_homepage.html';
});

// Initialize
displayWaterEntry();
