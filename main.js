const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-fill');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('button[data-skip]');
const ranges = player.querySelectorAll('input[type="range"]');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateBtnContent() {
  const icon = this.paused ? '<i class="fa fa-play-circle"></i>' : '<i class="fa fa-pause-circle-o"></i>';
  toggle.innerHTML = icon;
}

function skipTime() {
  const skip = this.dataset.skip;
  video.currentTime += parseFloat(skip);
}

function updateRanges() {
  console.log(this.value);
  const name = this.name;
  video[name] = this.value;
}

function updateProgressBar() {
  const progressFill = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = `${progressFill}%`;
}

function moveToProgressBar(e) {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

toggle.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);

video.addEventListener('play',updateBtnContent);
video.addEventListener('pause',updateBtnContent);

skipButtons.forEach(button => button.addEventListener('click',skipTime));

video.addEventListener('timeupdate',updateProgressBar);

ranges.forEach(range => range.addEventListener('change',updateRanges))
ranges.forEach(range => range.addEventListener('mousemove',updateRanges))

progress.addEventListener('click',moveToProgressBar);
