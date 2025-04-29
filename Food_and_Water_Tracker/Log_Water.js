let selectedWaterType = "";
let nutrients = {
  electrolytes: false,
  vitamins: false,
  minerals: false
};

document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'food_homepage.html';
});

// Water Type Buttons
const waterButtons = document.querySelectorAll('.water-type-btn');

function selectWaterType(type) {
  selectedWaterType = type;

  waterButtons.forEach(btn => btn.style.display = 'none');
  document.getElementById('changeTypeSection').style.display = 'block';

  if (type === 'Electrolyte Water') {
    document.getElementById('nutrientSection').style.display = 'block';
  } else {
    document.getElementById('nutrientSection').style.display = 'none';
  }

  // Highlight selected
  waterButtons.forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`.water-type-btn#${type.replace(" ", "").toLowerCase()}Btn`).classList.add('selected');
}

document.getElementById('plainWaterBtn').addEventListener('click', () => selectWaterType('Plain Water'));
document.getElementById('electrolyteWaterBtn').addEventListener('click', () => selectWaterType('Electrolyte Water'));
document.getElementById('flavoredWaterBtn').addEventListener('click', () => selectWaterType('Flavored Water'));

document.getElementById('changeTypeBtn').addEventListener('click', function() {
  waterButtons.forEach(btn => btn.style.display = 'inline-block');
  document.getElementById('changeTypeSection').style.display = 'none';
  document.getElementById('nutrientSection').style.display = 'none';
  selectedWaterType = "";
});

// Nutrient checkboxes
document.getElementById('electrolytes').addEventListener('change', function() {
  nutrients.electrolytes = this.checked;
});
document.getElementById('vitamins').addEventListener('change', function() {
  nutrients.vitamins = this.checked;
});
document.getElementById('minerals').addEventListener('change', function() {
  nutrients.minerals = this.checked;
});

// Save Water Entry
document.getElementById('saveWaterBtn').addEventListener('click', function() {
  const quantity = document.getElementById('quantityInput').value.trim();
  const unit = document.getElementById('unitSelect').value;
  const notes = document.getElementById('notesInput').value.trim();
  const waterDate = document.getElementById('waterDate').value;
  const waterTime = document.getElementById('waterTime').value;

  if (!selectedWaterType || !quantity || !waterDate || !waterTime) {
    alert('Please complete Water Type, Quantity, Date, and Time!');
    return;
  }

  const waterEntry = {
    waterType: selectedWaterType,
    quantity: quantity,
    unit: unit,
    nutrients: nutrients,
    notes: notes,
    date: waterDate,
    time: waterTime
  };

  // Save to waterLogs
  let waterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];
  waterLogs.unshift(waterEntry);
  localStorage.setItem('waterLogs', JSON.stringify(waterLogs));

  // Save to Recent Logs
  let recentLogs = JSON.parse(localStorage.getItem('recentLogs')) || [];
  recentLogs.unshift({
    type: 'water',
    waterType: selectedWaterType,
    date: waterDate,
    time: waterTime
  });
  localStorage.setItem('recentLogs', JSON.stringify(recentLogs.slice(0, 5)));

  alert('Water intake logged successfully!');
  window.location.href = 'food_homepage.html';
});
