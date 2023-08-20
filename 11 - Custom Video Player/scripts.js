const video = document.querySelector("video");
const progressBar = document.querySelector(".progress__filled");

const playButton = document.querySelector(`[title="Toggle Play"]`);
const volumeButton = document.querySelector(`[name="volume"]`);
const playbackRateButton = document.querySelector(`[name="playbackRate"]`);

const skip10 = document.querySelector(`[data-skip="-10"]`);
const skip25 = document.querySelector(`[data-skip="25"]`);

let isPlaying = false;

function skipBack() {
  //   console.log(video.currentTime);

  video.currentTime = video.currentTime - 10;
  console.log(video.currentTime);
}

function skipForward() {
  //   console.log(video.currentTime);

  video.currentTime = video.currentTime + 25;
  //   console.log(video.currentTime);
}

function togglePlay() {
  if (isPlaying) {
    video.pause();
    isPlaying = false;
  } else {
    video.play();
    isPlaying = true;
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

playButton.addEventListener("click", togglePlay);
volumeButton.addEventListener("change", changeVolume);
playbackRateButton.addEventListener("change", changePlaybackRate);
skip10.addEventListener("click", skipBack);
skip25.addEventListener("click", skipForward);
