const songs = [
    {
        title: "The Burn Marks on My Epiano Won't Go Away",
        artist: "A L E X",
        file: "../music/A L E X - The Burn Marks on My Epiano Wont Go Away.mp3"
    },
    {
        title: "CLUB SANDWICH",
        artist: "Joey Valence & Brae",
        file: "../music/CLUB SANDWICH.mp3"
    },
    {
        title: "DANCE NOW",
        artist: "Joey Valence & Brae",
        file: "../music/DANCE NOW.mp3"
    },
    {
        title: "DELINQUENT (TEEN TITAN)",
        artist: "Joey Valence & Brae",
        file: "../music/DELINQUENT (TEEN TITAN).mp3"
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
