console.log("script started");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const nowPlaying = document.querySelector("#nowPlaying h2");

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");

const canvas = document.getElementById("visualizer");

let ctx = null;
let visualizerReady = false;

if (canvas) {
    ctx = canvas.getContext("2d");
    visualizerReady = true;
}

let audioCtx;
let source;
let analyser;
let dataArray;
let bufferLength;

function initAudioGraph() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 128;

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
}

function unlockAudio() {
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

function drawVisualizer() {
    if (!visualizerReady || !analyser) {
        requestAnimationFrame(drawVisualizer);
        return;
    }

    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!dataArray || !bufferLength) return;

const bars = 64;

for (let i = 0; i < bars; i++) {
    // spread sampling across spectrum (instead of linear)
    const index = Math.floor(
        Math.pow(i / bars, 1.5) * bufferLength
    );

    const value = dataArray[index] || 0;
    const height = (value / 255) * canvas.height;

    const x = (i / bars) * canvas.width;

    ctx.shadowBlur = 8;
    ctx.shadowColor = "#6de8ff";
    ctx.fillStyle = "#8cf7ff";

    ctx.fillRect(
        x,
        canvas.height - height,
        (canvas.width / bars) - 2,
        height
    );
}
    
drawVisualizer();

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

let currentSong = 0;

songs.forEach((song, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
    `;

    li.onclick = () => {
        unlockAudio();
        initAudioGraph();

        currentSong = index;

        audio.src = song.file;
        audio.load();

        nowPlaying.textContent = songs[currentSong].title;

        audio.play();
    };

    playlist.appendChild(li);
});

playBtn.onclick = () => {
    unlockAudio();
    initAudioGraph();
    audio.play();
};

pauseBtn.onclick = () => {
    audio.pause();
};

nextBtn.onclick = () => {
    unlockAudio();
    initAudioGraph();

    currentSong++;

    if (currentSong >= songs.length)
        currentSong = 0;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();
};

prevBtn.onclick = () => {
    unlockAudio();
    initAudioGraph();

    currentSong--;

    if (currentSong < 0)
        currentSong = songs.length - 1;

    audio.src = songs[currentSong].file;
    audio.load();

    nowPlaying.textContent = songs[currentSong].title;

    audio.play();
};
