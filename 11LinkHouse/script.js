let cross = document.querySelector(".info>img");
let about = document.querySelectorAll(".parentBox");
let icon = document.querySelectorAll(".parentBox");



// Event for removing the info 
cross.addEventListener("click", () => {
    document.querySelector(".info").style.display = "none";
})




// Object with values of each cards about section
let obj = [
    {
        "title": "RagRekha",
        "description": "A home for music that flows through rhythm and emotion. Discover playlists, moods, and sounds that truly resonate"
    },
    {
        "title": "Weather",
        "description": "Real-time weather updates with clear forecasts and essential details. Stay prepared with accurate conditions, anytime, anywhere"
    },
    {
        "title": "Portfolio",
        "description": "A personal portfolio showcasing my projects, skills, and work experience. Built to highlight real-world development and problem-solving abilities"
    },
]



// Adding event for each card
about.forEach(a => {
    a.addEventListener("click", e => {
        for (let i = 0; i < obj.length; i++) {
            if (a.className.includes(obj[i].title)) {
                document.querySelector(".about").style.display = "block";
                document.querySelector(".about>h2").innerHTML = "Name - " + obj[i].title;
                document.querySelector(".about>p").innerHTML = "<b>Description: </b>"+obj[i].description;
            }
        }
    })
})




// Footer with updated year
let year = document.getElementById("year");
year.textContent = new Date().getFullYear();














