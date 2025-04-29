// Handle back button
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'exercise_homepage.html';
});

// Show custom activity input if 'Other' is selected
document.getElementById('activity-type').addEventListener('change', function() {
    if (this.value === 'Other') {
        document.getElementById('custom-activity').classList.remove('hidden');
    } else {
        document.getElementById('custom-activity').classList.add('hidden');
    }
});

// Handle Save button
document.getElementById('save-btn').addEventListener('click', function() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const exerciseData = {
        activityType: document.getElementById('activity-type').value === 'Other' 
            ? document.getElementById('custom-activity').value 
            : document.getElementById('activity-type').value,
        duration: {
            value: parseInt(document.getElementById('duration-value').value) || 0,
            unit: document.getElementById('duration-unit').value
        },
        caloriesBurned: parseInt(document.getElementById('calories').value) || 0,
        vitalsBefore: {
            value: parseFloat(document.getElementById('before-vital-value').value) || 0,
            type: document.getElementById('before-vital-type').value
        },
        vitalsDuring: {
            value: parseFloat(document.getElementById('during-vital-value').value) || 0,
            type: document.getElementById('during-vital-type').value
        },
        painLevel: parseInt(document.getElementById('pain-level').value),
        notes: document.getElementById('notes').value,
        date: date,
        time: time
    };

    console.log('Saving Exercise Data:', exerciseData);

    // Get old saved exercises
    let savedExercises = JSON.parse(localStorage.getItem('exerciseEntries')) || [];

    // Add new one
    savedExercises.push(exerciseData);

    // Save back to localStorage
    localStorage.setItem('exerciseEntries', JSON.stringify(savedExercises));

    // Redirect to homepage
    window.location.href = 'exercise_homepage.html';
});
