// Create audio object
let currentSong = new Audio();

// Store song list and current folder
let songs = [];
let currFolder = "";

// -------------------------
// FORMAT TIME (mm:ss)
// -------------------------
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// -------------------------
// GET SONGS FROM A FOLDER
// -------------------------
async function getSongs(folder) {
    // Normalize folder name (remove slashes)
    currFolder = folder.replaceAll("/", "");

    // Fetch folder HTML (Live Server directory listing)
    let a = await fetch(`/10Spotify-clone/songs/${currFolder}/`);
    let response = await a.text();

    // Convert HTML string to DOM
    let div = document.createElement("div");
    div.innerHTML = response;

    let links = div.getElementsByTagName("a");
    songs = [];

    // Extract mp3 files
    for (let link of links) {
        if (link.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(link.href.split("/").pop()));
        }
    }

    // Render song list
    let songUl = document.querySelector(".songList ul");
    songUl.innerHTML = "";

    for (let song of songs) {
        songUl.innerHTML += `
        <li>
            <img class="invert" src="./Images/music.svg">
            <div class="info">
                <div>${song}</div>
                <div>Lakshaya</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="./Images/playsong.svg">
            </div>
        </li>`;
    }

    // Add click event to each song
    Array.from(songUl.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            playMusic(li.querySelector(".info div").innerText);
        });
    });

    return songs;
}

// -------------------------
// PLAY MUSIC
// -------------------------
function playMusic(track, pause = false) {
    if (!track) return;

    // Set audio source
    currentSong.src = `/10Spotify-clone/songs/${currFolder}/${track}`;

    // Play unless pause is true
    if (!pause) {
        currentSong.play();
        play.src = "./Images/pausesong.svg";
    }

    // Update UI
    document.querySelector(".songinfo").innerText = track;
    document.querySelector(".songtime").innerText = "00:00 / 00:00";
}

// -------------------------
// DISPLAY ALBUMS
// -------------------------
async function displayAlbums() {
    let a = await fetch(`/10Spotify-clone/songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = Array.from(div.getElementsByTagName("a"));
    let cardContainer = document.querySelector(".cardContainer");

    for (let e of anchors) {
        if (!e.href.includes("/songs/")) continue;

        let folder = e.href.split("/").filter(Boolean).pop();

        try {
            let res = await fetch(`/10Spotify-clone/songs/${folder}/info.json`);
            let info = await res.json();

            cardContainer.innerHTML += `
            <div class="card" data-folder="${folder}">
                <div class="play">
                    <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="26" fill="#1DB954"/>
                        <polygon points="26,20 26,44 46,32" fill="#000"/>
                    </svg>
                </div>
                <img src="songs/${folder}/cover2.jpg">
                <h2>${info.title}</h2>
                <p>${info.description}</p>
            </div>`;
        } catch {
            // Skip album if info.json is missing
        }
    }

    // Load album on click
    cardContainer.addEventListener("click", async e => {
        let card = e.target.closest(".card");
        if (!card) return;

        await getSongs(card.dataset.folder);
        if (songs.length > 0) playMusic(songs[0]);
    });
}

// -------------------------
// MAIN FUNCTION
// -------------------------
async function main() {
    // Load default playlist
    await getSongs("favroite");
    playMusic(songs[0], true);

    // Load albums
    displayAlbums();

    // Play / Pause button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "./Images/pausesong.svg";
        } else {
            currentSong.pause();
            play.src = "./Images/playsong.svg";
        }
    });

    // Update time & seekbar
    currentSong.addEventListener("timeupdate", () => {
        if (!currentSong.duration) return;

        document.querySelector(".songtime").innerText =
            `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar click
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Sidebar open/close
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // -------------------------
    // PREVIOUS BUTTON (FIXED)
    // -------------------------
    previous.addEventListener("click", () => {
        let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFile);

        if (index > 0) {
            playMusic(songs[index - 1]);
        }
    });

    // -------------------------
    // NEXT BUTTON (FIXED)
    // -------------------------
    next.addEventListener("click", () => {
        let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFile);

        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });

    // Volume slider
    document.querySelector(".range input").addEventListener("change", e => {
        currentSong.volume = e.target.value / 100;
    });

    // Mute / unmute
    document.querySelector(".volume img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "volumeoff.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("volumeoff.svg", "volume.svg");
            currentSong.volume = 0.35;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 35;

        }
    });
}

// Start app
main();
