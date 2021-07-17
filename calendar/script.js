const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const rows = 6

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

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

// applies to the days in the previous month //
while (displayedDays.getMonth() !== currentDateMonth) {
    if(count === 0) {
        date += `<div id="row">`
    } else if(count % 7 === 0) {
        date += `</div><div id="row">`
    }
    date += `<div id="prior-days">${displayedDays.getDate()}</div>`; 
    displayedDays.setDate(displayedDays.getDate() + 1);
    count++;
}

// applies to the days in the current month //
for(;displayedDays.getMonth() === currentDateMonth; count++) {
    if(count % 7 === 0) {
        date += `</div><div id="row">`
    }
    if (displayedDays.getDate() === day) {
        date += `<div id="today">${displayedDays.getDate()}</div>`;
    } else {
        date += `<div>${displayedDays.getDate()}</div>`;
    }
    displayedDays.setDate(displayedDays.getDate() + 1);
}

// applies to the days in the next month //
for(;count < rows * days.length; count++) {
    if(count == rows * days.length) {
        date += `</div>`
    } else if(count % 7 === 0) {
        date += `</div><div id="row">`
    }
    date += `<div id="next-days">${displayedDays.getDate()}</div>`;
    displayedDays.setDate(displayedDays.getDate() + 1);
    document.querySelector('#day').innerHTML = date;
}