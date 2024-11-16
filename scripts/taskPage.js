document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: task");

    document.getElementById('edit-button-id')?.addEventListener('click', function(event) {
        editTask(event);
    });
});


function editTask(button) {
    console.log("Here");
    const task = button.closest('.task');
    const details = task.querySelector('.task-details');

    // Create input fields for editing date and description
    const nameInput = document.createElement("input");
    nameInput.type = "date";
    nameInput.value = details.querySelector('p:nth-child(1)').innerText.split(": ")[1];
    nameInput.className = "edit-input";


    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = details.querySelector('p:nth-child(1)').innerText.split(": ")[1];
    dateInput.className = "edit-input";

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = details.querySelector('p:nth-child(2)').innerText.split(": ")[1];
    timeInput.className = "edit-input";

    const descInput = document.createElement("textarea");
    descInput.className = "edit-input";
    descInput.value = details.querySelector('p:nth-child(3)').innerText.split(": ")[1];

    // Clear details and add input fields with a Save button
    details.innerHTML = '';
    details.appendChild(dateInput);
    details.appendChild(timeInput);
    details.appendChild(descInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-btn";
    saveButton.onclick = function () {
        saveTask(details, dateInput.value, timeInput.value, descInput.value, button);
    };

    details.appendChild(saveButton);
    details.style.display = "block";
}