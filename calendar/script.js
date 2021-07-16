const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const rows = 6

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const currentDate = new Date();
const [month, year, day] = [months[currentDate.getMonth()], currentDate.getFullYear(), currentDate.getDay()];

document.getElementById("current-date").innerText = `${month} ${day} ${year}`

let displayedDays = new Date(year, month)
displayedDays = displayedDays.getDay() === 1 ? displayedDays : new Date(year, month, displayedDays.getDate() - (7 - displayedDays.getDay()));
for(let count = 0; count < rows * days.length; count++) {
    document.querySelector('#all-days').innerHTML
}
