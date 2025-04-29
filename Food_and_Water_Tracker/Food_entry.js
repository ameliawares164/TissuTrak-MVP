// Load the selected food entry
const selectedFoodEntry = JSON.parse(localStorage.getItem('selectedFoodEntry'));

function displayFoodEntry() {
  if (!selectedFoodEntry) {
    document.getElementById('foodEntryDetails').innerHTML = `<p>No Food Entry Found.</p>`;
    return;
  }

  document.getElementById('foodEntryDetails').innerHTML = `
    <h2>${selectedFoodEntry.mealName}</h2>
    <p><strong>Date:</strong> ${selectedFoodEntry.date}</p>
    <p><strong>Time:</strong> ${selectedFoodEntry.time}</p>
    <p><strong>Meal Type:</strong> ${selectedFoodEntry.mealType || "N/A"}</p>

    <h3>Ingredients</h3>
    <ul>
      ${selectedFoodEntry.foodItems && selectedFoodEntry.foodItems.length > 0
        ? selectedFoodEntry.foodItems.map(item => `<li>🍴 ${item}</li>`).join('')
        : "<li>No ingredients listed.</li>"
      }
    </ul>

    <h3>Notes</h3>
    <p>${selectedFoodEntry.notes || "No notes provided."}</p>
  `;
}

// Back Button
document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'food_homepage.html';
});

// Initialize
displayFoodEntry();
