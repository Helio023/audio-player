class Player {
  constructor() {
    this.prev = document.querySelector(".prev");
    this.playPause = document.querySelector(".play-pause");
    this.next = document.querySelector(".next");
    this.bgImage = document.querySelector(".bg__img");
    this.singer = document.querySelector(".singer");
    this.musicTitle = document.querySelector(".music__title");
    this.singerName = document.querySelector(".music__artist");
    this.sound = document.querySelector(".vol__icon");
    this.volume = document.querySelector("#vol");
    this.duration = document.querySelector("#dur");
    this.startTime = document.querySelector(".start");
    this.endTime = document.querySelector(".end");

    this.currentTrack = 0;
    this.audio = new Audio();
    this.currentPlaying = {};
    this.isPlaying = false;
    this.startPlayer();
    this.nextSong();
    this.previousSong();
    this.toggleMute();
    this.setVolume();
  }

  audios = [
    {
      artist: "Daliwonga ft King Monada",
      title: "Tester",
      file: "audio/audio1.mp3",
      cover: "img/tester.jpg",
    },
    {
      artist: "Mdoover ft Sir Trill",
      title: "Uyalazi iPiano",
      file: "audio/audio2.mp3",
      cover: "img/uyalazi.jpg",
    },
    {
      artist: "Dj Maphorisa ft Sha sha",
      title: "Ithemba'Lam",
      file: "audio/audio3.mp3",
      cover: "img/ithemba.jpg",
    },
    {
      artist: "Tshego ft King Monada",
      title: "no ties",
      file: "audio/audio4.mp3",
      cover: "img/noties.jpg",
    },
    {
      artist: "Kabza De Small ft Dj Maphorisa",
      title: "eMicimbini",
      file: "audio/audio5.mp3",
      cover: "img/encimbini.jpg",
    },
  ];

  startPlayer() {
    this.currentPlaying = this.audios[this.currentTrack];
    this.bgImage.src = this.currentPlaying.cover;
    this.singer.src = this.currentPlaying.cover;
    this.musicTitle.textContent = this.currentPlaying.title;
    this.singerName.textContent = this.currentPlaying.artist;
    this.audio.src = this.currentPlaying.file;
    this.audio.play();
  }

  playAudio() {
    this.isPlaying = true;
    this.startPlayer();
    this.animateColor();
    this.setDuration();

    this.audio.addEventListener("loadeddata", () => {
      const min = Math.floor(this.audio.duration / 60);
      const sec = Math.floor(this.audio.duration % 60);

      const res = `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
      this.endTime.innerText = res;
      
    });

    this.audio.addEventListener("loadeddata", () => {
      this.audio.addEventListener("timeupdate", () => {
        const min = Math.floor(this.audio.currentTime / 60);
        const sec = Math.floor(this.audio.currentTime % 60);

        const res = `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
        this.startTime.innerText = res;
        
        this.duration.value = this.audio.currentTime
      });
    });

    this.audio.addEventListener("ended", () => {
      this.currentTrack++;

      if (this.currentTrack == this.audios.length) {
        this.currentTrack = 0;
      }

      this.startPlayer();
      this.audio.play();
    });
  }

  pauseAudio() {
    this.isPlaying = false;
    this.audio.pause();
  }

  tooglePlayPause() {
    this.playPause.addEventListener("click", () => {
      if (this.isPlaying) {
        this.pauseAudio();

        this.playPause.innerHTML = `<div class="play-pause">
        <svg
            class="player__icon"
            width="11px"
            height="14px"

        >
            <g
                id="Icons"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g id="Outlined" transform="translate(-244.000000, -955.000000)">
                    <g id="Av" transform="translate(100.000000, 852.000000)">
                        <g id="Outlined-/-AV-/-play_arrow" transform="translate(136.000000, 98.000000)">
                            <g>
                                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                <path d="M10,8.64 L15.27,12 L10,15.36 L10,8.64 Z M8,5 L8,19 L19,12 L8,5 Z" id="🔹-Icon-Color" fill="#1D1D1D"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>`;
      } else {
        this.playAudio();
        this.playPause.innerHTML = `<div class="play-pause">
        <svg width="12px" height="14px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">  
        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Outlined" transform="translate(-310.000000, -955.000000)">
                <g id="Av" transform="translate(100.000000, 852.000000)">
                    <g id="Outlined-/-AV-/-pause" transform="translate(204.000000, 98.000000)">
                        <g>
                            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                            <path d="M6,19 L10,19 L10,5 L6,5 L6,19 Z M14,5 L14,19 L18,19 L18,5 L14,5 Z" id="🔹-Icon-Color" fill="#fff"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
          <div class="circle circle1"></div>
          <div class="circle circle2"></div>
        </div>`;
      }
    });
  }

  nextSong() {
    this.next.addEventListener("click", () => {
      this.currentTrack++;

      if (this.currentTrack == this.audios.length) {
        this.currentTrack = 0;
      }

      this.startPlayer();
      this.audio.play();
    });
  }

  previousSong() {
    this.prev.addEventListener("click", () => {
      this.currentTrack--;

      if (this.currentTrack < 0) {
        this.currentTrack = this.audios.length - 1;
      }

      this.startPlayer();
      this.audio.play();
    });
  }

  toggleMute() {
    this.sound.addEventListener("click", () => {
      this.audio.muted = !this.audio.muted;
      this.sound.classList = this.audio.muted ? "vol" : "vol1";
    });
  }

  getVolume() {
    let vol = this.volume.value;
    this.audio.volume = vol / 100;
  }

  setVolume() {
    this.volume.addEventListener("input", () => {
      this.getVolume();
    });

    this.volume.addEventListener("change", () => {
      this.getVolume();
    });
  }

  getDuration() {
    let audioDuration = this.duration.value;
    this.duration.max = this.audio.duration;
    this.audio.currentTime = audioDuration;
  }

  setDuration() {
    this.duration.addEventListener("input", () => {
      this.getDuration();
    });

    this.duration.addEventListener("change", () => {
      this.getDuration();
    });
  }
  animateColor() {
    const colors = [
      "#515070",
      "#aa4a30",
      "#ff8e6e",
      "#ff7171",
      "#d789d7",
      "#e97171",
      "#1aa6b7",
      "#006a71",
    ];

    setInterval(() => {
      const circle1 = document.querySelector(".circle1");
      const circle2 = document.querySelector(".circle2");
      const randomColor = Math.floor(Math.random() * colors.length);

      circle1.style.borderTop = `2px solid ${colors[randomColor]}`;
      circle1.style.borderBottom = `2px solid ${colors[randomColor]}`;
      circle1.style.borderLeft = `2px solid ${colors[randomColor]}`;
      circle1.style.borderRight = `2px solid ${colors[randomColor]}`;

      circle2.style.borderTop = `2px solid ${colors[randomColor]}`;
      circle2.style.borderBottom = `2px solid ${colors[randomColor]}`;
      circle2.style.borderLeft = `2px solid ${colors[randomColor]}`;
      circle2.style.borderRight = `2px solid ${colors[randomColor]}`;
    }, 100);
  }
}

const player = new Player();

window.addEventListener("load", player.tooglePlayPause());
