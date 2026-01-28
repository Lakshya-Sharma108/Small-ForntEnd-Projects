// Let's write some js:

let currentSong = new Audio();

function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}



async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/10Spotify-clone/songs/");
    let response = await a.text();
    // console.log(response);


    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);


    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    // console.log(songs);
    return songs;
}


const playMusic = (track, pause = false) => {
    console.log("Attempting to play:", track);
    // Use the full path including 10Spotify-clone
    // let audio = new Audio("/10Spotify-clone/songs/" + track);

    currentSong.src = "/10Spotify-clone/songs/" + track;

    if (!pause) {
        currentSong.play()
        play.src = "./pausesong.svg"
    }


    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}


async function main() {
    // Get the list of all songs
    let songs = await getSongs();
    // console.log(songs);

    playMusic(songs[0], true);

    // Displaying songs in library
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
                                <img class="invert" src="./music.svg" alt="">
                                <div class="info">
                                    <div> ${song.replaceAll("%20", " ")}</div>
                                    <div>Lakshaya</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="./playsong.svg" alt="">
                                </div></li>`;
    }


    // Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })



    // Attach an event listener to play, next and previous button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "./pausesong.svg"
        }
        else {
            currentSong.pause()
            play.src = "./playsong.svg"
        }
    })



    // Event for time update time
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })


    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;

    })



    // Add an eventlistner for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0";
    })


    // Add an eventlistner for close button
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-120%";
    })
}

main();



// what we did till now:
// 1. Fetch the list of songs from the server
// 2. Parse the response to get the song names
// 3. Display the song names in the UI
// 4. Attach event listeners to each song item to play the song when clicked
