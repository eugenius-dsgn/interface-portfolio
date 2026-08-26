const videoPlayer = document.querySelector('#introduction-video');
const videoLong = videoPlayer.querySelector('.long');
const videoLoop = videoPlayer.querySelector('.loop');
const playToggle = videoPlayer.querySelector('.video-play-toggle');
const durationDisplay = videoPlayer.querySelector('.video-controls p');

let isPlaying;
let videoDuration;

window.addEventListener('load', function () {
  videoDuration = videoLong.duration;
  durationDisplay.innerText = `${Math.floor(videoDuration)}с`;
  isPlaying = false;
});

videoLong.addEventListener('play', function () {
  isPlaying = true;
  console.log('isPlaying:', isPlaying);
});

videoLong.addEventListener('pause', function () {
  isPlaying = false;
  console.log('isPlaying:', isPlaying);
});

videoLong.addEventListener('ended', function () {
  isPlaying = false;
  videoPlayer.classList.remove('is-playing');
  durationDisplay.innerText = `${Math.floor(videoDuration)}с`;
});

videoPlayer.addEventListener('click', function () {
  if (document.body.classList.contains('is-loading')) {
    return;
  }

  if (isPlaying) {
    videoLong.pause();
    videoPlayer.classList.remove('is-playing');
    videoLoop.loop=true;
    durationDisplay.innerText = `${Math.floor(videoDuration - videoLong.currentTime)}с`;
  } else {
    videoLong.play();
    videoPlayer.classList.add('is-playing');
    videoLoop.loop=false;
  }
});
