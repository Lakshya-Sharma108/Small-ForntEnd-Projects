let hour = document.getElementById("hrs");
let mins = document.getElementById("min");
let sec = document.getElementById("sec");


setInterval(() => {
    let currentTime = new Date();

    console.log(currentTime);


    hour.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    mins.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);
