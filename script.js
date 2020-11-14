// AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively

// I am using a daily planner to create a schedule

// WHEN I open the planner the current day is displayed at the top of the calendar
displayDate = moment().format('dddd, MMM Do, YYYY');
$("#currentDay").append(document.createTextNode(displayDate));

// WHEN I scroll down I am presented with time blocks for standard business hours

// WHEN I view the time blocks for that day each time block is color-coded to indicate whether it is in the past, present, or future


$('.input-group-prepend').each(function (i, value) {
    $(this).hover(function (e) {

        var currentTime = moment(new Date());
        var selectedTime = moment($(this).children().eq(0).text(), 'h:mma');

        if (selectedTime.isBefore(currentTime))
            $(this).children().css("background-color", "red");

        else if (selectedTime.isSame(currentTime))
            $(this).children().css("background-color", "yellow");

        else $(this).children().css("background-color", "blue");
    }, function () {
        $(this).children().css("background-color", "");
    });
});

// WHEN I click into a time block I can enter an event

// WHEN I click the save button for that time block
let saveButtons = document.querySelectorAll('button[type=button][id="button-addon1"]');
for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", saveScheduledEvent);
}

// THEN the text for that event is saved in local storage
function saveScheduledEvent() {
    localStorage.setItem($(this).parentsUntil(".container").children().children().eq(1).text(), $(this).parent().parent().children()[1].value.trim());
}

// WHEN I refresh the page, the saved events persist
var timeSlots = document.querySelectorAll('.input-group-text');
for (var i = 0; i < timeSlots.length; i++) {
    let ts = timeSlots[i].textContent;
    let agendaText = localStorage.getItem(ts);
    $(timeSlots[i]).parentsUntil(".container").children().eq(2).text(agendaText);
}