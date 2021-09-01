const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const rows = 6

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const currentDate = new Date();
const currentDateMonth = currentDate.getMonth();
const [month, year, day] = [months[currentDateMonth], currentDate.getFullYear(), currentDate.getDate()];

document.getElementById("date").innerText = `${month} ${year}`

let displayedDays = new Date(year, currentDateMonth);
console.log(displayedDays);
displayedDays = displayedDays.getDay() === 1 ? displayedDays : new Date(year, currentDateMonth, displayedDays.getDate() - (7 - displayedDays.getDay()));
console.log(displayedDays);

let date = "";
let count = 0;
let row = 1;
let column = 1;

// applies to displaying the days of the month //
for(let index = 0; index < days.length; index++) {
    if(index == 0) {
        date += `<div id="row" style="display:inherit; grid-row:${row}; grid-column: 1 / 8;">`;
    }
    date += `<div style="display:inherit; grid-column: ${column};
              place-items: center;">${days[index]}</div>`;
    column++;
}
date += `</div>`;
row++;
column = 1;

// applies to the days in the previous month //
while (displayedDays.getMonth() !== currentDateMonth) {
    if(count === 0) {
        date += `<div id="row" style="display:inherit; grid-row:${row}; grid-column: 1 / 8;">`;
    } else if(count % 7 === 0) {
        date += `</div><div id="row">`;
    }
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
    
    if(count % 7 === 0) {
        date += `</div><div id="row" style="display:inherit; grid-row:${row}; grid-column: 1 / 8;">`;
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

    if(count == rows * days.length) {
        date += `</div>`;
    } else if(count % 7 === 0) {
        date += `</div><div id="row" style="display:inherit; grid-row:${row}; grid-column: 1 / 8;">`;
    }
    date += `<div id="next-days" style="display:inherit; grid-column: ${column};
              place-items: center;">${displayedDays.getDate()}</div>`;
    displayedDays.setDate(displayedDays.getDate() + 1);
    document.querySelector('#days').innerHTML = date;
    column++;
}