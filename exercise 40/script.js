const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const speed = document.getElementById("speed");
const title = document.getElementById("title");
const playlistEl = document.getElementById("playlist");

let index = 0;
let isPlaying = false;

const videos = [
  {
    title: "Big Buck Bunny",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://picsum.photos/100/70?1",
  },
  {
    title: "Bear Video",
    src: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://picsum.photos/100/70?2",
  },
  {
    title: "Nature Clip",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://picsum.photos/100/70?3",
  },
  {
    title: "Sea Waves",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    thumbnail: "https://picsum.photos/100/70?4",
  },
  {
    title: "Sintel Short",
    src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    thumbnail: "https://picsum.photos/100/70?5",
  },
];

function loadVideo(i) {
  index = i;
  video.src = videos[i].src;
  title.textContent = videos[i].title;
  highlightPlaylist();
}

function playVideo() {
  video.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  isPlaying = true;
}

function pauseVideo() {
  video.pause();
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  isPlaying = false;
}

// CONTROLS

playBtn.addEventListener("click", () => {
  isPlaying ? pauseVideo() : playVideo();
});

prevBtn.addEventListener("click", () => {
  loadVideo(index === 0 ? videos.length - 1 : index - 1);
  playVideo();
});

nextBtn.addEventListener("click", () => {
  loadVideo(index === videos.length - 1 ? 0 : index + 1);
  playVideo();
});

video.addEventListener("ended", () => {
  loadVideo(index === videos.length - 1 ? 0 : index + 1);
  playVideo();
});

//PROGRESS

video.addEventListener("timeupdate", () => {
  progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTimeEl.textContent = formatTime(video.currentTime);
  durationEl.textContent = formatTime(video.duration);
});

progressBar.addEventListener("click", (e) => {
  video.currentTime = (e.offsetX / progressBar.clientWidth) * video.duration;
});

//VOLUME & SPEED

volume.addEventListener("input", () => {
  video.volume = volume.value;
});

speed.addEventListener("change", () => {
  video.playbackRate = speed.value;
});

// PLAYLIST

videos.forEach((v, i) => {
  const li = document.createElement("li");
  li.className = "playlist-item";

  li.innerHTML = `
    <img src="${v.thumbnail}">
    <div>
      <div class="playlist-title">${v.title}</div>
      <div class="playlist-duration">--:--</div>
    </div>
  `;

  li.addEventListener("click", () => {
    loadVideo(i);
    playVideo();
  });

  playlistEl.appendChild(li);

  const tempVideo = document.createElement("video");
  tempVideo.src = v.src;
  tempVideo.addEventListener("loadedmetadata", () => {
    li.querySelector(".playlist-duration").textContent = formatTime(
      tempVideo.duration
    );
  });
});

function highlightPlaylist() {
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function formatTime(time) {
  if (!time) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

loadVideo(index);
