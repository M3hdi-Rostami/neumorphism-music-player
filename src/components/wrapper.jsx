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
} from "@fortawesome/free-solid-svg-icons";
import Button from "./button";

class Wrapper extends Component {
  state = {
    musices: [
      {
        id: 1,
        title: "Asabani",
        singer: "Shayea",
        coverSrc: "/files/1.jpg",
        musicSrc: "/files/1.mp3",
        duration: "4:49",
      },
      {
        id: 2,
        title: "Koochamoon",
        singer: "Ehsan Daryadel",
        coverSrc: "/files/2.jpg",
        musicSrc: "/files/2.mp3",
        duration: "3:31",
      },
      {
        id: 3,
        title: "Ghorse Ghamar2",
        singer: "Behnam Bani",
        coverSrc: "/files/3.jpg",
        musicSrc: "/files/3.mp3",
        duration: "2:57",
      },
      {
        id: 4,
        title: "Delkhosham",
        singer: "Ehsan Daryadel",
        coverSrc: "/files/4.jpg",
        musicSrc: "/files/4.mp3",
        duration: "3:21",
      },
      {
        id: 5,
        title: "Havasam Nist",
        singer: "Babak Mafi",
        coverSrc: "/files/5.jpg",
        musicSrc: "/files/5.mp3",
        duration: "3:29",
      },
    ],
    playingMusic: {
      id: 1,
      title: "Asabani",
      singer: "Shayea",
      coverSrc: "/files/1.jpg",
      musicSrc: "/files/1.mp3",
      duration: "4:49",
    },
    playing: false,
    likes: JSON.parse(localStorage.getItem("likes")) || [],
    likedClass: "",
  };
componentDidMount(){
  this.likeMount()
}

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <header>
            <Button icon={<FontAwesomeIcon icon={faArrowLeft} />} cls="back" />
            <span className={this.state.playing ? "darkGreen" : "darkRed"}>
              {this.state.playing ? "PLAY NOW" : "STOP NOW"}
            </span>
            <Button icon={<FontAwesomeIcon icon={faBars} />} cls="menu" />
          </header>

          <div className={`imageBox ${this.state.playing ? "playing" : ""}`}>
            <img src={this.state.playingMusic.coverSrc} alt="" />
          </div>
          <div className="captionBox">
            <h3>
              {this.state.playingMusic.title} - {this.state.playingMusic.singer}
            </h3>
            <p>instagram: @m3hdi_v1</p>
          </div>
          <div className="truckBox">
            <div className="timeBox">
              <span>03:12</span>
              <span>{this.state.playingMusic.duration}</span>
            </div>
            {/* <div className="truck"></div> */}
            <audio src={this.state.playingMusic.musicSrc} id="song"></audio>
            <input
              type="range"
              id="progressBar"
              min="0"
              max=""
              value="0"
              onChange={this.changeProgressBar}
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
              cls="play"
              onClick={this.playPause}
            />
            <Button
              icon={<FontAwesomeIcon icon={faFastForward} />}
              cls="forward"
              onClick={this.nextSong}
            />
          </div>
        </div>
      </div>
    );
  }
  like = () => {
    let data = this.state.likes || [];
    const index = data.indexOf(this.state.playingMusic.id);
    if (index > -1) {
      data.splice(index, 1);
      this.setState({likedClass: ""});
    } else {
      data.push(this.state.playingMusic.id);
      this.setState({ likedClass: "darkRed" });
    }
    data = [...new Set(data)];
    localStorage.setItem("likes", JSON.stringify(data));
  };

  likeMount(id=1) {
    let data = this.state.likes || [];
    console.log(data);
    console.log(id);
    const index = data.indexOf(id);
    console.log(index);
      this.setState({ likedClass: (index > -1) ? "darkRed" : "" });
  };

  playPause = () => {
    const song = document.getElementById("song");
    if (this.state.playing) {
      song.pause();
      this.setState({ playing: false });
    }
    if (!this.state.playing) {
      song.play();
      this.setState({ playing: true });
    }
    this.updateProgressBar();
  };
  previousSong = async () => {
    this.likeMount(this.state.playingMusic.id - 1);
    this.setPlayingMusicDuration();

    const prevMusicItem =
      this.state.musices.find(
        (item) => item.id === this.state.playingMusic.id - 1
      ) ||
      this.state.musices.find((item) => item.id === this.state.musices.length);
    await this.setState({ playingMusic: prevMusicItem });
    this.playPause();
  };
  nextSong = async () => {
    this.likeMount(this.state.playingMusic.id + 1);
    this.setPlayingMusicDuration();

    const prevMusicItem =
      this.state.musices.find(
        (item) => item.id === this.state.playingMusic.id + 1
      ) || this.state.musices.find((item) => item.id === 1);
    await this.setState({ playingMusic: prevMusicItem });
    this.playPause();
  };
  changeProgressBar = () => {
    // this.updateProgressBar()
  };
  setPlayingMusicDuration() {
    const song = document.getElementById("song");
    const playingMusic = this.state.playingMusic;
    let minutes = Math.floor(song.duration / 60);
    let seconds = Math.floor(song.duration % 60);

    playingMusic.duration = `${minutes > 10 ? minutes : `0${minutes}`}:${
      seconds > 10 ? seconds : `0${seconds}`
    }`;
    this.setState({ playingMusic });
  }
  updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const song = document.getElementById("song");
    progressBar.max = song.duration;
    /* setInterval(() => {
      progressBar.value = song.currentTime;
    }, 500); */
  }
}

export default Wrapper;
