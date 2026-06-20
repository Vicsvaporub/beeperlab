const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const nowPlaying = document.querySelector("#nowPlaying h2");

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

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

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 128;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawVisualizer(){

    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const barWidth = canvas.width / bufferLength;

    for(let i=0;i<bufferLength;i++){

        const value = dataArray[i];
        const height = value / 255 * canvas.height;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#6de8ff";
        ctx.fillStyle = "#8cf7ff";

        ctx.fillRect(
            i * barWidth,
            canvas.height - height,
            barWidth - 2,
            height
        );
    }
}

drawVisualizer();

function unlockAudio(){
    if(audioCtx.state === "suspended"){
        audioCtx.resume();
    }
}

        
songs.forEach((song, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
    `;

li.onclick = () => {
    unlockAudio();

    currentSong = index;

    audio.src = song.file;
    audio.load();

    nowPlaying.textContent = song.title;

    audio.play();

};
    
    playlist.appendChild(li);
});

playBtn.onclick = () => {
    unlockAudio();
    audio.play();
};

pauseBtn.onclick = () => {
    audio.pause();
};

nextBtn.onclick = () => {
    unlockAudio();

    currentSong++;

    if(currentSong >= songs.length)
        currentSong = 0;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();

};

prevBtn.onclick = () => {
    unlockAudio();

    currentSong--;

    if(currentSong < 0)
        currentSong = songs.length-1;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();

};
