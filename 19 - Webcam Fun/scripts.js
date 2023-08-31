const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      //   console.log(localMediaStream);
      //   this is no longer accepted by browsers for media streams
      //   video.src = window.URL.createObjectURL(localMediaStream);
      //  the src object can be directly attached to the media stream
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("Oh No!", err);
    });
}

function paintToCanvas() {
  // get the dimensions of the video stream.
  const width = video.videoWidth;
  const height = video.videoHeight;
  //   console.log(width, height);
  //   set the dimensions of the canvas to be the same as the video stream
  canvas.width = width;
  canvas.height = height;
  // if we return the interval we can then stop it.
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // apply a filter
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // write the pixels that we have but also show the previous ones for 10 more frames
    // apply 10% transparency for each frame
    // keep stacking the frames up on the canvas
    // ctx.globalAlpha = 0.1;
    // put them back in

    pixels = greenScreen(pixels);

    ctx.putImageData(pixels, 0, 0);
    debugger;
  }, 16);
}

function takePhoto() {
  //  play snap sound
  snap.currentTime = 0;
  snap.play();
  //   take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  // make a link to the image (data)
  const link = document.createElement("a");
  link.href = data;

  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome person" />`;
  //   put the link in the strip
  strip.insertBefore(link, strip.firstChild);
  //   console.log(data);
}

function redEffect(pixels) {
  // pixels.data is the array we need to access to apply colour changes
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.25; //blue
    // pixels.data[i + 3]; //alpha
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    //  set the
    pixels.data[i - 150] = pixels.data[i + 0]; // red
    pixels.data[i + 500] = pixels.data[i + 1]; //green
    pixels.data[i - 550] = pixels.data[i + 2]; //blue
    // pixels.data[i + 3]; //alpha
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];
    //  if any of these pixels are between the min and max, remove them
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // set the alpha channel to 0 (transparent)
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}
// Filter ideas
// Mirror
// Kaleidoscope
getVideo();
// listen for the video event 'canplay' to be emmited then paint the video to the canvas
video.addEventListener("canplay", paintToCanvas);
