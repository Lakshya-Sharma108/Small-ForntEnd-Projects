// Let's write some js:

let currentSong = new Audio();

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


const playMusic = (track) => {
    console.log("Attempting to play:", track);
    // Use the full path including 10Spotify-clone
    // let audio = new Audio("/10Spotify-clone/songs/" + track);

    currentSong.src = "/10Spotify-clone/songs/" + track;
    currentSong.play()
}


async function main() {
    // Get the list of all songs
    let songs = await getSongs();
    console.log(songs);

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
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=> {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
}

main();


