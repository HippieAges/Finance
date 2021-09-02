const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const rows = 6

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const currentDate = new Date();
let currentDateMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDay = currentDate.getDate();

function renderCalendar() {
    currentDay = currentDate.getMonth() === currentDateMonth && currentDate.getFullYear() === currentYear ? currentDate.getDate() : -1;
    const [month, year, day] = [months[currentDateMonth], currentYear, currentDay];
    console.log(currentDateMonth, currentDate.getMonth(),  year, currentDate.getFullYear(), day);
    document.getElementById("date").innerText = `${month} ${year}`

    let displayedDays = new Date(year, currentDateMonth);
    displayedDays = displayedDays.getDay() === 1 ? displayedDays : new Date(year, currentDateMonth, displayedDays.getDate() - (7 - displayedDays.getDay()));

    let date = "";
    let count = 0;
    let row = 1;
    let column = 1;

    // applies to displaying the days of the month //
    for(let index = 0; index < days.length; index++) {
        date += `<div id="weekday" style="display:inherit; grid-column: ${column};
                place-items: center;">${days[index]}</div>`;
        column++;
    }
    row++;
    column = 1;

    // applies to the days in the previous month //
    while (displayedDays.getMonth() !== currentDateMonth) {
    
        date += `<div id="prior-days" style="display:inherit; grid-column: ${column};
                place-items: center;">${displayedDays.getDate()}</div>`; 
        displayedDays.setDate(displayedDays.getDate() + 1);
        count++;
        column++;
    }

    // applies to the days in the current month //
    for(;displayedDays.getMonth() === currentDateMonth; count++) {
        if(column == 8) {
            column = 1;
            row++;
        }
        
        if (displayedDays.getDate() === day) {
            date += `<div id="today" style="display:inherit; grid-column: ${column};
                    place-items: center;">${displayedDays.getDate()}</div>`;
        } else {
            date += `<div style="display:inherit; grid-column: ${column};
                    place-items: center;">${displayedDays.getDate()}</div>`;
        }
        displayedDays.setDate(displayedDays.getDate() + 1);
        column++;
    }

    // applies to the days in the next month //
    for(;count < rows * days.length; count++) {
        if(column == 8) {
            column = 1;
            row++;
        }

        date += `<div id="next-days" style="display:inherit; grid-column: ${column};
                place-items: center;">${displayedDays.getDate()}</div>`;
        displayedDays.setDate(displayedDays.getDate() + 1);
        document.querySelector('#days').innerHTML = date;
        column++;
    }
}

document.getElementById("left-arrow").addEventListener("click", function() {
    if(currentDateMonth === 0) {
        currentDateMonth = 11;
        currentYear--;
    } else {
        currentDateMonth--;
    }
    renderCalendar();
});
document.getElementById("right-arrow").addEventListener("click", function() {
    if(currentDateMonth === 11) {
        currentDateMonth = 0;
        currentYear++;
    } else {
        currentDateMonth++;
    }
    renderCalendar();
});

renderCalendar();