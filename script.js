$(document).ready(function () {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Create time blocks
    for (let hour = 9; hour <= 17; hour++) {
      let timeBlock = $("<div>").addClass("row time-block");
      let hourCol = $("<div>").addClass("col-1 hour").text(dayjs().hour(hour).format("hA"));
      let textArea = $("<textarea>").addClass("col-10 description");
  
      // Check time and add past, present, or future class
      if (hour < dayjs().hour()) {
        textArea.addClass("past");
      } else if (hour === dayjs().hour()) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }
  
      // Retrieve event from local storage
      let savedEvent = localStorage.getItem(`event-${hour}`);
      if (savedEvent) {
        textArea.val(savedEvent);
        timeBlock.addClass("event-saved"); // Added a class for styling purposes to turn green once saved
        console.log(`Event found for hour ${hour}: ${savedEvent}`);
      }
  
      let saveBtn = $("<button>").addClass("col-1 saveBtn").html('<i class="fas fa-save"></i>');
  
      // Save event to local storage when save button is clicked
      saveBtn.on("click", function () {
        let eventText = textArea.val();
        localStorage.setItem(`event-${hour}`, eventText);
        timeBlock.addClass("event-saved"); // Added a class for styling purposes to turn green once saved
        console.log(`Event saved for hour ${hour}: ${eventText}`);
      });
  
      // Append elements to time block and time blocks to the container
      timeBlock.append(hourCol, textArea, saveBtn);
      $(".container").append(timeBlock);
    }
  });
  