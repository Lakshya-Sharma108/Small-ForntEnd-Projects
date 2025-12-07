let hour = document.getElementById("hrs");
let mins = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
    let currentTime = new Date();

    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();

    // let ampm = h >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    h = h % 12;
    h = h ? h : 12; // if hour is 0, set to 12

    hour.innerHTML = (h < 10 ? "0" : "") + h;
    mins.innerHTML = (m < 10 ? "0" : "") + m;
    sec.innerHTML = (s < 10 ? "0" : "") + s;

}, 1000);
