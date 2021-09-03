const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const rows = 6
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const currentDate = new Date();
let [currentMonth, currentYear, currentDay] = [currentDate.getMonth(), currentDate.getFullYear(), currentDate.getDate()];

function includeDivs(divInfo, date, displayedDays) {
    date += `<div id="${divInfo['id']}" style="display:inherit; grid-column: ${divInfo['column']};
                place-items: center;">${divInfo['date']}</div>`;
    if(divInfo['setDate']) {
        displayedDays.setDate(displayedDays.getDate() + 1);
    } 
    return date;
}

function setDisplay() {
    if(document.getElementById("year-content").style.display === "flex") {
        document.getElementById("year-content").style.display = "none";
    } else {
        document.getElementById("year-content").style.display = "flex";
    } 
}

function windowOnClick(event) {
    const yearContent = document.getElementById("year-content");
    const date = document.getElementById("date");
    if(yearContent.style.display === "flex" && event.target !== date && event.target !== yearContent) {
        yearContent.style.display = "none";
    }
}

function renderCalendar() {
    // current day will be -1 if we're not in the current month //
    currentDay = currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear ? currentDate.getDate() : -1;
    const [month, year] = [months[currentMonth], currentYear];
    document.getElementById("date").innerText = `${month} ${year}`

    document.getElementById("date").addEventListener("click", setDisplay);
    document.querySelector(".container").addEventListener("click", windowOnClick);

    let displayedDays = new Date(year, currentMonth, 1);
    displayedDays.setDate(-1 * displayedDays.getDay() + 2); // + 2 is performed here since getDay() is 0-indexed and we begin on Sunday, not Monday
    let date = "";
    let count = 0;
    let row = 1;
    let column = 1;

    // applies to displaying the days of the month //
    for(let index = 0; index < days.length; index++) {
        date = includeDivs({"id": "weekday", "column": column, "date": days[index], "setDate": false}, date, displayedDays);
        column++;
    }
    row++;
    column = 1;

    // applies to the days in the previous month //
    while (displayedDays.getMonth() !== currentMonth) {
        date = includeDivs({"id": "prior-days", "column": column, "date": displayedDays.getDate(), "setDate": true}, date, displayedDays);
        count++;
        column++;
    }

    // applies to the days in the current month //
    for(;displayedDays.getMonth() === currentMonth; count++) {
        if(column == 8) {
            column = 1;
            row++;
        }
        map = {"id": "", "column": column, "date": displayedDays.getDate(), "setDate": true}
        if (currentDay === displayedDays.getDate()) {
            map["id"] = "today";
        }
        date = includeDivs(map, date, displayedDays);
        column++;
    }

    // applies to the days in the next month //
    for(;count < rows * days.length; count++) {
        if(column == 8) {
            column = 1;
            row++;
        }

        date = includeDivs({"id": "next-days", "column": column, "date": displayedDays.getDate(), "setDate": true}, date, displayedDays)
        document.querySelector('#days').innerHTML = date;
        column++;
    }
}

document.getElementById("left-arrow-outer").addEventListener("click", function() {
    if(currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar();
});
document.getElementById("right-arrow-outer").addEventListener("click", function() {
    if(currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar();
});

renderCalendar();