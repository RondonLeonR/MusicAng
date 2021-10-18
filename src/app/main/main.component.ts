import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  audio = new Audio();
  songTime: any = "00:00";
  timeProgress: any = "";
  duration: any = "00:00";
  durationProgress: any = 0;
  volumenChanged = 0.4;

  playing = false;
  numberSong = 0;
  song = { "id": 0, "title": "", "artist": "", "song": "", "photo": "", "color": "" };
  songs = [
    { "id": 0, "title": "Trying", "artist": "Leo", "song": "../../assets/music/Trying.mp3", "photo": "../../assets/Artist/Leo.jpg", "color": "#323bbd" },
    { "id": 1, "title": "Happier Than Ever", "artist": "Billie Eilish", "song": "../../assets/music/HappierThanEver.mp3", "photo": "../../assets/Artist/Billie.jpeg", "color": "#bd328f" },
    { "id": 2, "title": "Photograph", "artist": "Ed Sheeran", "song": "../../assets/music/Photograph.mp3", "photo": "../../assets/Artist/Ed.jpg", "color": "#3ebd32" },
    { "id": 3, "title": "Dancing With Your Ghost", "artist": "Sasha Alex Sloan", "song": "../../assets/music/DWYG.mp3", "photo": "../../assets/Artist/Sasha.jpg", "color": "#bd328f" }
  ]

  constructor() { }

  ngOnInit(): void {
    this.audio.volume = this.volumenChanged;
    this.song = this.songs[this.numberSong];

    this.changeStyle(this.song.color);
  }

  playAudio() {
    if (this.timeProgress != 0) {
      this.audio.play();
      this.playing = true;
    } else {
      this.audio.src = this.song.song;
      this.audio.load();
      this.audio.play();
      this.playing = true;
      setTimeout(() => {
        this.durationProgress = parseInt((this.audio.duration).toFixed(0));
        this.duration = this.formatTime((this.audio.duration).toFixed(0));
      }, 500);
    }
    this.changeStyle(this.song.color);


    this.audio.addEventListener("timeupdate", (currentTime) => {
      this.timeProgress = parseInt(this.audio.currentTime.toFixed(1));
      this.songTime = this.formatTime(this.audio.currentTime.toFixed(0));
    });

    this.audio.onended = (event) => {
      console.log("Otra Prueba!");
      this.nextSong();
    }

    /*this.audio.addEventListener("ended", () => {
      console.log("Cancion terminada");
      this.nextSong();
    });*/
  }

  stopAudio() {
    this.playing = false;
    this.audio.pause();
  }

  nextSong() {
    this.timeProgress = 0;
    if (this.numberSong == 3) {
      this.numberSong = 0
      this.song = this.songs[this.numberSong];
    }
    else {
      this.numberSong++;
      this.song = this.songs[this.numberSong];
    }
    this.changeStyle(this.song.color);

    if (this.playing) {
      this.playAudio();
    }
  }

  prevSong() {

  }

  changeVolumen(vol) {
    this.audio.volume = vol / 100;
  }

  changeStyle(color) {
    document.documentElement.style.setProperty('--colorMain', color);
  }

  formatTime(seconds) {
    let minute: any = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    let second: any = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return + minute + ':' + second;
  }
}
