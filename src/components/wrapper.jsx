import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faHeart,
  faFastBackward,
  faPlay,
  faPause,
  faFastForward,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
import Copyright from "./copyright";
import List from "./list";

class Wrapper extends Component {
  render() {
    const homePageClass = `w-100 flex_center_column ${
      this.state.showList && "d_none"
    }`;
    return (
      <div className="wrapper">
        <header>
          <Button
            onClick={this.GoToHome}
            icon={
              this.state.showList ? (
                <FontAwesomeIcon icon={faArrowLeft} />
              ) : (
                <FontAwesomeIcon icon={faMusic} />
              )
            }
            cls="back"
          />
          <span className={this.state.playing ? "darkGreen" : "darkRed"}>
            {this.state.playing ? "PLAY NOW" : "STOP NOW"}
          </span>
          <Button
            onClick={this.showList}
            icon={<FontAwesomeIcon icon={faBars} />}
            cls="menu"
          />
        </header>
        <div className="main">
          <div className={homePageClass}>
            <div className={`imageBox ${this.state.playing && "playing"}`}>
              <img src={this.state.playingMusic.coverSrc} alt="" />
            </div>
            <div className="captionBox">
              <h3>
                {this.state.playingMusic.title} -{" "}
                {this.state.playingMusic.singer}
              </h3>
              <p>instagram: @m3hdi_v1</p>
            </div>
            <div className="truckBox">
              <div className="timeBox">
                <span>{this.state.playingMusic.currentTime}</span>
                <span>{this.state.playingMusic.duration}</span>
              </div>
              <audio src={this.state.playingMusic.musicSrc} id="song"></audio>
              <input
                type="range"
                min="0"
                max="100"
                id="trucker"
                className="w-100"
                onChange={this.seek}
              />
            </div>
            <div className="controlBox">
              <Button
                onClick={this.like}
                icon={<FontAwesomeIcon icon={faHeart} />}
                cls="heart"
                colorClass={this.state.likedClass}
              />
              <Button
                icon={<FontAwesomeIcon icon={faFastBackward} />}
                cls="backward"
                onClick={this.previousSong}
              />
              <Button
                icon={
                  this.state.playing ? (
                    <FontAwesomeIcon icon={faPause} />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} />
                  )
                }
                cls="play big_btn"
                onClick={this.playPause}
              />
              <Button
                icon={<FontAwesomeIcon icon={faFastForward} />}
                cls="forward"
                onClick={this.nextSong}
              />
            </div>
          </div>
          <List
            musics={this.state.musics}
            playingMusic={this.state.playingMusic}
            playPause={this.playOfList}
            showList={this.state.showList}
          />
        </div>
        <Copyright />
      </div>
    );
  }
  state = {
    musics: [
      {
        id: 1,
        title: "Asabani",
        singer: "Shayea",
        coverSrc: "/files/1.jpg",
        musicSrc: "/files/1.mp3",
        currentTime: "00:00",
        duration: "00:00",
      },
      {
        id: 2,
        title: "Koochamoon",
        singer: "Ehsan Daryadel",
        coverSrc: "/files/2.jpg",
        musicSrc: "/files/2.mp3",
        currentTime: "00:00",
        duration: "00:00",
      },
      {
        id: 3,
        title: "2JA",
        singer: "Ho3ein & Bi Bal",
        coverSrc: "/files/3.jpg",
        musicSrc: "/files/3.mp3",
        currentTime: "00:00",
        duration: "00:00",
      },
      {
        id: 4,
        title: "Delkhosham",
        singer: "Ehsan Daryadel",
        coverSrc: "/files/4.jpg",
        musicSrc: "/files/4.mp3",
        currentTime: "00:00",
        duration: "00:00",
      },
      {
        id: 5,
        title: "Havasam Nist",
        singer: "Babak Mafi",
        coverSrc: "/files/5.jpg",
        musicSrc: "/files/5.mp3",
        currentTime: "00:00",
        duration: "00:00",
      },
    ],
    playingMusic: {
      id: 1,
      title: "Asabani",
      singer: "Shayea",
      coverSrc: "/files/1.jpg",
      musicSrc: "/files/1.mp3",
      currentTime: "00:00",
      duration: "00:00",
    },
    playing: false,
    likedClass: "",
    showList: false,
    updateTimer: null,
  };
  componentDidMount() {
    this.likeMount();
    this.ended();
    this.reset();
  }
  ended() {
    const song = document.getElementById("song");
    song.addEventListener("ended", this.nextSong);
  }
  seek = (e) => {
    const player = document.getElementById("song");
    const trucker = document.getElementById("trucker");
    const seekTo = player.duration * (trucker.value / 100);
    player.currentTime = seekTo;
  };
  seekUpdate = () => {
    console.log("loop");
    const player = document.getElementById("song");
    const trucker = document.getElementById("trucker");

    let seekPosition = 0;
    let currentMinutes = 0;
    let currentSeconds = 0;
    let durationMinutes = 0;
    let durationSeconds = 0;
    if (player.currentTime) {
      seekPosition = player.currentTime * (100 / player.duration);
      trucker.value = seekPosition;

      currentMinutes = Math.floor(player.currentTime / 60);
      currentSeconds = Math.floor(player.currentTime - currentMinutes * 60);
      durationMinutes = Math.floor(player.duration / 60);
      durationSeconds = Math.floor(player.duration - durationMinutes * 60);
    }

    const currentTime = this.handleTimeFormat(currentMinutes, currentSeconds);
    const duration = this.handleTimeFormat(durationMinutes, durationSeconds);
    this.setState({
      playingMusic: { ...this.state.playingMusic, currentTime, duration },
    });
  };
  handleTimeFormat(minutes, secondes) {
    const min = (minutes >= 10 && minutes) || `0${minutes}`;
    const sec = (secondes >= 10 && secondes) || `0${secondes}`;
    return `${min}:${sec}`;
  }
  reset() {
    const player = document.getElementById("song");
    const trucker = document.getElementById("trucker");
    clearInterval(this.state.updateTimer);
    this.seekUpdate();
    player.currentTime = 0;
    trucker.value = 0;
  }
  GoToHome = () => {
    this.setState({ showList: false });
  };
  like = () => {
    let data = JSON.parse(localStorage.getItem("likes")) || [];
    const index = data.indexOf(this.state.playingMusic.id);
    if (index > -1) {
      data.splice(index, 1);
      this.setState({ likedClass: "" });
    } else {
      data.push(this.state.playingMusic.id);
      this.setState({ likedClass: "darkRed" });
    }
    data = [...new Set(data)];
    localStorage.setItem("likes", JSON.stringify(data));
  };
  likeMount() {
    let data = JSON.parse(localStorage.getItem("likes")) || [];
    const index = data.indexOf(this.state.playingMusic.id);
    this.setState({ likedClass: index > -1 ? "darkRed" : "" });
  }
  playOfList = async (id) => {
    const music = this.state.musics.find((item) => item.id === id);
    await this.setState({ playingMusic: music });
    await this.setState({ playing: true });
    document.getElementById("song").play();
    this.reset();
    this.setState({ updateTimer: setInterval(this.seekUpdate, 1000) });
  };
  playPause = async (newMusic = false) => {
    const song = document.getElementById("song");
    if (newMusic || !this.state.playing) {
      await this.setState({ playing: true });
      song.play();
      this.setState({ updateTimer: setInterval(this.seekUpdate, 1000) });
      return;
    } else {
      await this.setState({ playing: false });
      song.pause();
      clearInterval(this.state.updateTimer);
    }
  };
  previousSong = async () => {
    this.reset();
    const prevMusicItem =
      this.state.musics.find(
        (item) => item.id === this.state.playingMusic.id - 1
      ) ||
      this.state.musics.find((item) => item.id === this.state.musics.length);
    await this.setState({ playingMusic: prevMusicItem });
    this.playPause(true);
    this.likeMount();
  };
  nextSong = async () => {
    this.reset();
    const prevMusicItem =
      this.state.musics.find(
        (item) => item.id === this.state.playingMusic.id + 1
      ) || this.state.musics.find((item) => item.id === 1);
    await this.setState({ playingMusic: prevMusicItem });
    await this.playPause(true);
    this.likeMount();
  };
  showList = () => {
    this.setState({ showList: true });
  };
}

export default Wrapper;
