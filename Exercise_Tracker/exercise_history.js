document.getElementById('export-btn').addEventListener('click', function() {
    const printArea = document.getElementById('print-area');
    const entriesList = document.getElementById('entries-list');
  
    // Clone only the entries, not the full page
    printArea.innerHTML = '';
  
    let savedExercises = JSON.parse(localStorage.getItem('exerciseEntries')) || [];
  
    if (savedExercises.length === 0) {
      alert('No exercises available to export.');
      return;
    }
  
    savedExercises.reverse().forEach(entry => {
      const div = document.createElement('div');
      div.style.marginBottom = '20px';
      div.innerHTML = `
        <h2>${entry.activityType}</h2>
        <p><strong>Date:</strong> ${entry.date || 'Unknown'} | ${entry.time || 'Unknown'}</p>
        <p><strong>Duration:</strong> ${entry.duration.value} ${entry.duration.unit}</p>
        <p><strong>Calories Burned:</strong> ${entry.caloriesBurned} kcal</p>
        <p><strong>Vitals Before:</strong> ${entry.vitalsBefore.value} ${entry.vitalsBefore.type}</p>
        <p><strong>Vitals During:</strong> ${entry.vitalsDuring.value} ${entry.vitalsDuring.type}</p>
        <p><strong>Pain Level:</strong> ${entry.painLevel}</p>
        <p><strong>Notes:</strong> ${entry.notes || 'None'}</p>
        <hr>
      `;
      printArea.appendChild(div);
    });
  
    // Create a new print window for just the printArea
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
      <head>
        <title>Exercise Entries Export</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h2 {
            color: #00b394;
          }
          hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #ccc;
          }
        </style>
      </head>
      <body>${printArea.innerHTML}</body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  });
  