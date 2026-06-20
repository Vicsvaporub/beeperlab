const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSong = 0;

const songs = [
    {
        title: "The Burn Marks on My Epiano Won't Go Away",
        artist: "A L E X",
        file: "../music/A L E X - The Burn Marks on My Epiano Wont Go Away.mp3"
    },

    { title: "Track 1", artist: "Ksu4000", file: "../music/Track1.mp3" },
    { title: "Track 2", artist: "Ksu4000", file: "../music/Track2.mp3" },
    { title: "Track 3", artist: "Ksu4000", file: "../music/Track3.mp3" },
    { title: "Track 4", artist: "Ksu4000", file: "../music/Track4.mp3" },
    { title: "Track 5", artist: "Ksu4000", file: "../music/Track5.mp3" },
    { title: "Track 6", artist: "Ksu4000", file: "../music/Track6.mp3" },
    { title: "Track 7", artist: "Ksu4000", file: "../music/Track7.mp3" },
    { title: "Track 8", artist: "Ksu4000", file: "../music/Track8.mp3" },
    { title: "Track 9", artist: "Ksu4000", file: "../music/Track9.mp3" },
    { title: "Track 10", artist: "Ksu4000", file: "../music/Track10.mp3" },
    { title: "Track 11", artist: "Ksu4000", file: "../music/Track11.mp3" },
    { title: "Track 12", artist: "Ksu4000", file: "../music/Track12.mp3" },
    { title: "Track 13", artist: "Ksu4000", file: "../music/Track13.mp3" },
    { title: "Track 14", artist: "Ksu4000", file: "../music/Track14.mp3" },
    { title: "Track 15", artist: "Ksu4000", file: "../music/Track15.mp3" },
    { title: "Track 16", artist: "Ksu4000", file: "../music/Track16.mp3" },
    { title: "Track 17", artist: "Ksu4000", file: "../music/Track17.mp3" },
    { title: "Track 18", artist: "Ksu4000", file: "../music/Track18.mp3" }
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");

songs.forEach((song, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
    `;

li.onclick = () => {

    currentSong = index;

    audio.src = song.file;
    audio.load();

    nowPlaying.textContent = song.title;

    audio.play();

};
    
    playlist.appendChild(li);
});

playBtn.onclick = () => {
    audio.play();
};

pauseBtn.onclick = () => {
    audio.pause();
};

nextBtn.onclick = () => {

    currentSong++;

    if(currentSong >= songs.length)
        currentSong = 0;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();

};

prevBtn.onclick = () => {

    currentSong--;

    if(currentSong < 0)
        currentSong = songs.length-1;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();

};
