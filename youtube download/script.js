document
  .querySelector("#search-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = document.querySelector("#search-input").value;
    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}=US&lang=en`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2e8fcaf519mshbdab5530f4894b6p140f82jsn8772d6155db1",
        "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      displayVideo(result.data);
    } catch (error) {
      console.error(error);
    }
  });

function displayVideo(videos) {
  const videoList = document.querySelector("#video-list");
  videoList.innerHTML = "";
  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.classList = "video-item";
    videoItem.innerHTML = `<div class="video-thumbnail" style="background-image:url('${video.thumbnail[0].url}')"></div> <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-channel">${video.channelTitle}</div>
      </div>`;
    videoItem.addEventListener("click", () => openModel(video.videoId));
    videoList.appendChild(videoItem);
  });
}
function openModel(videoId) {
  const modal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  // console.log("Opening video:", videoId, videoUrl);

  videoPlayer.src = videoUrl;
  modal.style.display = "block";

  videoPlayer.onerror = function () {
    alert("This video is not available on YouTube.");
    closeModal();
  };

  document.getElementById("download-mp3").onclick = async function () {
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9452172446msh620b23d249c353fp16dad9jsn7b983901f89b",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.status === "ok") {
        window.location.href = result.link;
      } else {
        alert("Error downloading MP3: " + result.msg);
      }
    } catch (error) {
      console.error("Error downloading MP3:", error);
    }
  };
}

document.getElementById("close-modal").addEventListener("click", closeModal);

window.onclick = function (event) {
  const modal = document.getElementById("video-modal");
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  const modal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  videoPlayer.src = "";
  modal.style.display = "none";
}
