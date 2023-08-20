const video = document.querySelector("video");
const progressBar = document.querySelector(".progress__filled");

const playButton = document.querySelector(`[title="Toggle Play"]`);
const volumeButton = document.querySelector(`[name="volume"]`);
const playbackRateButton = document.querySelector(`[name="playbackRate"]`);

const skipButtons = document.querySelectorAll(`[data-skip]`);

function skip() {
  console.log("skipped");
  video.currentTime = video.currentTime + Number(this.dataset.skip);
}

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function changeVolume() {
  video.volume = this.value;
}

function changePlaybackRate() {
  video.playbackRate = this.value;
}

setInterval(() => {
  let currentPercent = Math.floor((video.currentTime / video.duration) * 100);
  // set the width of the progress bar (flex-basis)
  progressBar.style["flex-basis"] = `${currentPercent}%`;
  //   console.log(currentPercent);
}, 1000);

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

playButton.addEventListener("click", togglePlay);
volumeButton.addEventListener("change", changeVolume);
playbackRateButton.addEventListener("change", changePlaybackRate);

skipButtons.forEach((button) => button.addEventListener("click", skip));

// skip10.addEventListener("click", skipBack);
// skip25.addEventListener("click", skipForward);
