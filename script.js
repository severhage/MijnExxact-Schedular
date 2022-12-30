const form = document.querySelector('#schedule-form');
const schedulesContainer = document.querySelector('#schedules');

form.addEventListener('submit', event => {
  event.preventDefault();

  const date = form.elements.date.value;
  const startTime = form.elements.startTime.value;
  const endTime = form.elements.endTime.value;
  const workerName = form.elements.workerName.value;
  const qualifications = form.elements.qualifications.value;

  const schedule = {
    date,
    startTime,
    endTime,
    workerName,
    qualifications
  };

  createSchedule(schedule);
});

// Modify the createSchedule function to include an edit button
function createSchedule(schedule) {
    const scheduleElement = document.createElement('div');
    scheduleElement.classList.add('schedule');
  
    const date = moment(schedule.date).format('D MMMM YYYY');
    const startTime = moment(schedule.startTime, 'HH:mm').format('H:mm');
    const endTime = moment(schedule.endTime, 'HH:mm').format('H:mm');
  
    scheduleElement.innerHTML = `
      <h3>${schedule.workerName}</h3>
      <p>${date}</p>
      <p>${startTime} - ${endTime}</p>
      <p>Kwalificaties: ${schedule.qualifications}</p>
      <button class="edit-button">Edit</button>
    `;
  
    schedulesContainer.appendChild(scheduleElement);
  }
  
  // Add a click event listener to the edit button
  schedulesContainer.addEventListener('click', event => {
    if (event.target.classList.contains('edit-button')) {
      // Get the schedule element that contains the edit button
      const scheduleElement = event.target.parentNode;
  
      // Extract the schedule data from the element
      const workerName = scheduleElement.querySelector('h3').textContent;
      const date = scheduleElement.querySelectorAll('p')[1].textContent;
      const startTime = scheduleElement.querySelectorAll('p')[2].textContent.split(' - ')[0];
      const endTime = scheduleElement.querySelectorAll('p')[2].textContent.split(' - ')[1];
      const qualifications = scheduleElement.querySelectorAll('p')[3].textContent.split(': ')[1];
  
      // Create an object with the schedule data
      const schedule = {
        workerName,
        date,
        startTime,
        endTime,
        qualifications
      };
  
      // Display the schedule data in the form for editing
      form.elements.workerName.value = schedule.workerName;
      form.elements.date.value = schedule.date;
      form.elements.startTime.value = schedule.startTime;
      form.elements.endTime.value = schedule.endTime;
      form.elements.qualifications.value = schedule.qualifications;
    }
  });
  
  // Add a function to update the schedule element with the edited data
  function updateSchedule(scheduleElement, schedule) {
    scheduleElement.querySelector('h3').textContent = schedule.workerName;
    scheduleElement.querySelectorAll('p')[1].textContent = schedule.date;
    scheduleElement.querySelectorAll('p')[2].textContent = `${schedule.startTime} - ${schedule.endTime}`;
    scheduleElement.querySelectorAll('p')[3].textContent = `Kwalificaties: ${schedule.qualifications}`;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
  
    const date = form.elements.date.value;
    const startTime = form.elements.startTime.value;
    const endTime = form.elements.endTime.value;
    const workerName = form.elements.workerName.value;
    const qualifications = form.elements.qualifications.value;
  
    const schedule = {
      date,
      startTime,
      endTime,
      workerName,
      qualifications
    };
  
    // Check if the form is being used to edit a schedule
    const activeEditButton = schedulesContainer.querySelector('.edit-button.active');
    if (activeEditButton) {
      // Get the schedule element that contains the active edit button
      const scheduleElement = activeEditButton.parentNode;
  
      // Update the element with the new data
      updateSchedule(scheduleElement, schedule);
  
      // Remove the active class from the edit button
      activeEditButton.classList.remove('active');
    } else {
      // Create a new schedule element
      createSchedule(schedule);
    }
}); 