// Let's write some js:
let currentSong = new Audio();
let songs;
let currFolder;

// function formatTime(seconds) {
//     const totalSeconds = Math.floor(seconds);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;

//     let result = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     if (result == NaN) {
//         return "00:00"
//     }else{
//         return result;
//     }
// }


function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/10Spotify-clone/songs/${folder}/`);
    let response = await a.text();
    // console.log(response);


    let div = document.createElement("div");
    div.innerHTML = response;
    // console.log(div);

    let as = div.getElementsByTagName("a")
    // console.log(as);


    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        // console.log(as[i]);

        if (element.href.endsWith(".mp3")) {
            // console.log(element.href);

            songs.push(element.href.split(`${folder}`)[1])
            // console.log(element.href.split("/ncs/")[1]);
        }
    }
    // console.log(songs);





    // Displaying songs in library
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUl.innerHTML = "";
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
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
}


const playMusic = (track, pause = false) => {
    console.log("Attempting to play:", track);
    // Use the full path including 10Spotify-clone
    // let audio = new Audio("/10Spotify-clone/songs/" + track);

    currentSong.src = `/10Spotify-clone/songs/${currFolder}/` + track;
    if (!pause) {
        currentSong.play()
        play.src = "./pausesong.svg"
    }

    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/10Spotify-clone/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer")
    
    Array.from(anchors).forEach(async e => {
        // console.log(e.href);
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[1];

            // Get the metadata of folder
            let a = await fetch(`http://127.0.0.1:5500/10Spotify-clone/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);

            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="ncs" class="card">
                        <div class="play">
                            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <!-- Green circle -->
                                <circle cx="32" cy="32" r="26" fill="#1DB954" />

                                <!-- Play icon -->
                                <polygon points="26,20 26,44 46,32" fill="#000000" />
                            </svg>
                        </div>
                        <img src="songs/${folder}/cover.jpeg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    })
    // console.log(div);

}

async function main() {
    // Get the list of all songs
    await getSongs("/ncs/");
    // console.log(songs);
    playMusic(songs[0], true);


    // Display all the albums on the page
    displayAlbums();


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
        // console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })


    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;

    })



    // Add an eventlistner for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })


    // Add an eventlistner for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })


    // Add an event listner for previous
    previous.addEventListener("click", () => {
        currentSong.pause();
        console.log("previous is clicked");
        // console.log(currentSong);

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }

    })

    // Add an event listner for next
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("next is clicked");
        // console.log(currentSong);

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }

    })



    // Add and event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to : ", e.target.value, "/100");
        currentSong.volume = parseInt(e.target.value) / 100;
    })




    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`/${item.currentTarget.dataset.folder}`)
        })
    })
}
main();



// what we did till now:
// 1. Fetch the list of songs from the server
// 2. Parse the response to get the song names
// 3. Display the song names in the UI
// 4. Attach event listeners to each song item to play the song when clicked
