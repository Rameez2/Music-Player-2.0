console.log('hello world')
const songs = [
    {
      songName:'Alan Walker Faded',
      channelName:'Alan Walker',
      image:'images/faded.jpg',
      audioFile:'songs/Faded.mp3'
    },
    {
      songName:'blinkingLights',
      channelName:'blinkingLights',
      image:'images/TheWeekendBlinkingLisghts.png',
      audioFile:'songs/blinkingLights.mp3'
    },
    {
      songName:'Cradles',
      channelName:'Cradles Walker',
      image:'images/cradles.jpg',
      audioFile:'songs/Cradles.mp3'
    },
  ]
let songCount = 0;
let currentSong;
let songRangeInterval;

const audioElement = document.querySelector("#audio-element")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const prevBtn = document.querySelector("#prev")
const songRange = document.querySelector("#song-range")

const songName = document.querySelector("#song-name");
const channelName = document.querySelector("#channel-name");
const songImage = document.querySelector("#song-image");

// Audio Source
function updateElements() {
  currentSong = songs[songCount];
  audioElement.src = currentSong.audioFile;
  songName.innerText = currentSong.songName;
  channelName.innerText = currentSong.channelName;
  songImage.src = currentSong.image;
}

function resetData() {
  clearInterval(songRangeInterval);
  songRange.value = 0;
  console.log('interval cleared');

}

function playSong() {
  if(audioElement.paused) {
    console.log('play');
    playBtn.setAttribute("class","fa-solid fa-circle-stop");
    console.log('range',parseInt(audioElement.duration));
    // update Range 
    songRange.max = parseInt(audioElement.duration);
    // songRangeUpdate()
    audioElement.play()
    songRangeInterval = setInterval(() => {
      console.log(parseInt(songRange.value),parseInt(audioElement.duration));
      if(parseInt(songRange.value) === parseInt(audioElement.duration) || parseInt(songRange.value) > parseInt(audioElement.duration)){
          console.log('reachhhed');
          // clearInterval(songRangeInterval);
          nextSong()    
      }
        songRange.value = parseInt(songRange.value)+1;
  }, 1500);

  }
}

function pauseSong() {
  if(!audioElement.paused) {
    clearInterval(songRangeInterval)
    console.log('pause');
    playBtn.setAttribute("class","fa-solid fa-circle-play");
    audioElement.pause()
  }
}
// PREVIOUS BUTTON FUNCTION
function prevSong() {
  console.log('prev');
  clearInterval(songRangeInterval);
  if(audioElement.paused && songCount >= 1) {
    console.log('RESET',songCount);
    resetData()
    songCount--;
    updateElements()
  }
  else if(!audioElement.paused && songCount >= 1) {
    pauseSong();
    prevSong();
    playSong()
  }
}

// NEXT BUTTON FUNCTION
function nextSong() {
  clearInterval(songRangeInterval);
  if(audioElement.paused && songCount <= (songs.length-1)) {
    console.log('NEXT',songCount);
    resetData()
    songCount++;
    updateElements()
  }
  else if(!audioElement.paused && songCount <= (songs.length-1)){
    pauseSong();
    nextSong();
    playSong();
    // resetData()
    // songCount++;
    // updateElements()
    // playSong()
  }
}

updateElements()

// RANGE INPUT LISTENER

songRange.addEventListener('input',()=> {
  audioElement.currentTime = songRange.value;
})

// PLAY button Listener
playBtn.addEventListener("click",() => {
  console.log(parseInt(audioElement.duration));
  if(audioElement.paused) {
    playSong()
  }
  else{
    pauseSong()
  }
})
// NEXT button Listener
nextBtn.addEventListener("click",() => {
  nextSong()
})
// PREVIOUS button Listener
prevBtn.addEventListener("click",() => {
  prevSong()
})



