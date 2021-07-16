const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentDate = new Date();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();
const day = currentDate.getDay();

document.getElementById("current-date").innerText = `${month} ${day} ${year}`