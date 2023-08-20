const video = document.querySelector("video");
const progressBar = document.querySelector(".progress__filled");

const playButton = document.querySelector(`[title="Toggle Play"]`);
const rangeButtons = document.querySelectorAll(`[type="range"]`);

const skipButtons = document.querySelectorAll(`[data-skip]`);

function skip() {
  console.log("skipped");
  video.currentTime += parseFloat(this.dataset.skip);
}

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function handleRangeUpdate() {
  //   console.log(this.name);
  video[this.name] = this.value;
}
// this gets called even if the video isnt playing...
// setInterval(() => {
//   let currentPercent = Math.floor((video.currentTime / video.duration) * 100);
//   // set the width of the progress bar (flex-basis)
//   progressBar.style["flex-basis"] = `${currentPercent}%`;
//   //   console.log(currentPercent);
// }, 1000);
function handleProgress() {
  const currentPercent = Math.floor((video.currentTime / video.duration) * 100);
  progressBar.style.flexBasis = `${currentPercent}%`;
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

playButton.addEventListener("click", togglePlay);

rangeButtons.forEach((range) =>
  range.addEventListener("change", handleRangeUpdate)
);

skipButtons.forEach((button) => button.addEventListener("click", skip));

// skip10.addEventListener("click", skipBack);
// skip25.addEventListener("click", skipForward);
