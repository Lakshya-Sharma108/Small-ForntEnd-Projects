let hour = document.getElementById("hrs");
let mins = document.getElementById("min");
let sec = document.getElementById("sec");

let currentTime = new Date();

console.log(currentTime);


hour.innerHTML = currentTime.getHours();
mins.innerHTML = currentTime.getMinutes();
sec.innerHTML = currentTime.getSeconds();