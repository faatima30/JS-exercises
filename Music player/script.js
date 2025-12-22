const audioElement = document.createElement("audio");
document.body.appendChild(audioElement);

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const volumeSlider = document.getElementById("volume");
const speedSelect = document.getElementById("speed");

const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    cover: "https://picsum.photos/250?random=1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    cover: "https://picsum.photos/250?random=2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    cover: "https://picsum.photos/250?random=3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Song Four",
    artist: "Artist Four",
    cover: "https://picsum.photos/250?random=4",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

let songIndex = 0;
let isPlaying = false;
let speed = 1;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audioElement.src = song.src;
}

loadSong(songs[songIndex]);

function playSong() {
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");
  audioElement.play().catch((e) => console.error("Error playing audio:", e));
  isPlaying = true;
}

function pauseSong() {
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
  audioElement.pause();
  isPlaying = false;
}

function prevSong() {
  pauseSong();
  setTimeout(() => {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }, 300);
}

function nextSong() {
  pauseSong();
  setTimeout(() => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }, 300);
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  audioElement.playbackRate = speed;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioElement.duration;
  if (isNaN(duration)) return;
  const newTime = (clickX / width) * duration;

  if (isFinite(newTime)) {
    audioElement.currentTime = newTime;
  }
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audioElement.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audioElement.addEventListener("ended", nextSong);

volumeSlider.addEventListener("input", (e) => {
  audioElement.volume = e.target.value;
});

speedSelect.addEventListener("change", (e) => {
  speed = parseFloat(e.target.value);
  audioElement.playbackRate = speed;
});

audioElement.addEventListener("loadedmetadata", updateProgress);
