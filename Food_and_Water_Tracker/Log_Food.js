let ingredients = [];
let selectedMealType = "";

document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'food_homepage.html';
});

// Meal Type selection
const mealButtons = document.querySelectorAll('.meal-btn');
mealButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    mealButtons.forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    selectedMealType = this.getAttribute('data-meal');
  });
});

// Add Ingredient
document.getElementById('addIngredientBtn').addEventListener('click', function() {
  const ingredientName = document.getElementById('ingredient').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const unit = document.getElementById('unitSelect').value;

  if (ingredientName && amount) {
    const entry = `${amount} ${unit} ${ingredientName}`;
    ingredients.push(entry);

    const li = document.createElement('li');
    li.textContent = entry;
    document.getElementById('ingredientList').appendChild(li);

    // Clear fields
    document.getElementById('ingredient').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('unitSelect').selectedIndex = 0;
  } else {
    alert('Please enter an ingredient and amount.');
  }
});

// Save Food Entry
document.getElementById('saveFoodBtn').addEventListener('click', function() {
  const mealName = document.getElementById('mealName').value.trim();
  const mealDate = document.getElementById('mealDate').value;
  const mealTime = document.getElementById('mealTime').value;
  const notes = document.getElementById('notesInput').value.trim();

  if (!mealName || !mealDate || !mealTime || !selectedMealType) {
    alert('Please fill out Meal Name, Meal Type, Date, and Time!');
    return;
  }

  const foodEntry = {
    mealName: mealName,
    mealType: selectedMealType,
    foodItems: ingredients,
    notes: notes,
    date: mealDate,
    time: mealTime
  };

  // Save to foodLogs
  let foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || [];
  foodLogs.unshift(foodEntry);
  localStorage.setItem('foodLogs', JSON.stringify(foodLogs));

  // Save to Recent Logs
  let recentLogs = JSON.parse(localStorage.getItem('recentLogs')) || [];
  recentLogs.unshift({
    type: 'food',
    mealName: mealName,
    date: mealDate,
    time: mealTime
  });
  localStorage.setItem('recentLogs', JSON.stringify(recentLogs.slice(0, 5)));

  alert('Meal logged successfully!');
  window.location.href = 'food_homepage.html';
});
