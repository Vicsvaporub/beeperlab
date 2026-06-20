const songs = [
    {
        title: "The Burn Marks on My Epiano Won't Go Away",
        artist: "A L E X",
        file: "../music/A L E X - The Burn Marks on My Epiano Wont Go Away.mp3"
    },
    {
        title: "Space Song",
        artist: "Beach House",
        file: "../music/Beach House - Space Song.mp3"
    },
    {
        title: "Hollow Log",
        artist: "Beck",
        file: "../music/Beck - Hollow Log.mp3"
    },
    {
        title: "Recuerdos De Ypacaraí",
        artist: "Caetano Veloso",
        file: "../music/Caetano Veloso - Recuerdos De Ypacarai.mp3"
    },
    {
        title: "Tonada De Luna Llena",
        artist: "Caetano Veloso",
        file: "../music/Caetano Veloso - Tonada De Luna Llena.mp3"
    },
    {
        title: "Duvet",
        artist: "bôa",
        file: "../music/bôa - Duvet.mp3"
    }
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");

songs.forEach((song) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
    `;

li.onclick = async () => {
    audio.pause();
    audio.src = song.file;
    audio.load();

    try {
        await audio.play();
    } catch (err) {
        console.error(err);
    }
};

    playlist.appendChild(li);
});
