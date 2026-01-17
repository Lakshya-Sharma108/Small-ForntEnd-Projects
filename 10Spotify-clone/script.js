// Let's write some js:

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/10Spotify-clone/songs/");
    let response = await a.text();
    console.log(response);


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

    // playing songs
    var audio = new Audio(songs[0]);
    // audio.play(); 



}

main();
