const player = document.querySelector(".player");
const video = document.querySelector(".viewer");

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

const playButton = document.querySelector(`[title="Toggle Play"]`);
const rangeButtons = document.querySelectorAll(`[type="range"]`);
const fullscreenButton = document.querySelector(`[name="fullscreen"]`);

const skipButtons = document.querySelectorAll(`[data-skip]`);

const controls = document.querySelector(".player__controls");

function skip() {
  //   console.log("skipped");
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
  video[this.name] = this.value;
}

function handleProgress() {
  const currentPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${currentPercent}%`;
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

function scrub(e) {
  //firefox shows offsetX as 0..but logging it to console gives a value
  // this is 100%
  console.log(progress.offsetWidth);
  //this is current percentage
  console.log(e.offsetX);
  scrubbedTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(scrubbedTime);
  video.currentTime = scrubbedTime;
}

function handleFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
    console.log("exiting fullscreen");
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

playButton.addEventListener("click", togglePlay);

rangeButtons.forEach((range) =>
  range.addEventListener("change", handleRangeUpdate)
);
rangeButtons.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

fullscreenButton.addEventListener("click", handleFullscreen);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

skipButtons.forEach((button) => button.addEventListener("click", skip));

// video.addEventListener("fullscreenchange", () => {
//   if (document.fullscreenElement) {
//     controls.style.display = "block";
//   } else {
//     controls.style.display = "flex";
//   }
// });
