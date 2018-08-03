import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player';

class Player extends Component {
    constructor() {
        super();
        this.rap = null;
        this.defaultBar = null;

        this.state = {
            currentTime: "00:00",
            width: 0,
            buttonPlay: '/sprite.svg#icon-play3',
            buttonMute: '/sprite.svg#icon-volume-high',
            isClicked: false
        };
    }
    playOrPause = () => {
        if (this.rap.audioEl.paused) {
            this.rap.audioEl.play();
        }
        else {
            this.rap.audioEl.pause();
        }
    }
    muteOrUnmute = () => {
        if (this.rap.audioEl.muted) {
            this.rap.audioEl.muted = false;
            this.setState({ isClicked: !this.state.isClicked, buttonMute: '/sprite.svg#icon-volume-high' });
        }
        else {

            this.rap.audioEl.muted = true;
            this.setState({ isClicked: !this.state.isClicked, buttonMute: '/sprite.svg#icon-volume-mute' });
        }
    }
    onListen = () => {
        let totalBarSize = this.defaultBar.offsetWidth;
        let curTime = this.rap.audioEl.currentTime;
        let minutes = this.props.pad(Math.floor(curTime / 60));
        let seconds = this.props.pad(Math.floor(curTime % 60));
        let totalDuration = this.rap.audioEl.duration;
        let width = parseInt((curTime * totalBarSize) / totalDuration);
        this.setState({ width: width, currentTime: `${minutes}:${seconds}` });
    }
    prev = () => {
        this.props.setPreviousTrack();
        this.resetPlayer();
    }
    next = () => {
        this.props.setNextTrack();
        this.resetPlayer();
    }
    resetPlayer = () => {
        this.rap.audioEl.muted = false;
        this.setState({
            width: 0,
            buttonPlay: '/sprite.svg#icon-play3',
            buttonMute: '/sprite.svg#icon-volume-high'
        })
    }
    getTrackTime() {
        let minutes = this.props.pad(Math.floor(this.props.activeSong.duration_ms / (1000 * 60)));
        let seconds = this.props.pad(Math.floor((this.props.activeSong.duration_ms % (1000 * 60)) / 100 / 10));
        return { minutes: minutes, seconds: seconds }
    }
    render() {
        let artistsName = null;
        if (this.props.activeSong.artists) {
            artistsName = this.props.activeSong.artists[0].name;
        }
        return (
            <nav className="navbar">
                <ReactAudioPlayer
                    autoPlay={this.props.autoPlay}
                    ref={(element) => { this.rap = element; }}
                    onPlay={() => this.setState({ buttonPlay: '/sprite.svg#icon-pause2' })}
                    onPause={() => this.setState({ buttonPlay: '/sprite.svg#icon-play3' })}
                    onEnded={() => {
                        if (this.props.autoPlay) {
                            this.next();
                        }
                        this.setState({ width: 0, currentTime: "00:00" })
                    }}
                    listenInterval={500}
                    onListen={this.onListen}
                    src={this.props.activeSong.preview_url} />
                <div className="player__img-box">
                    <img className="player__img" src={this.props.activeSong.album.images[0].url} alt="" />
                    <div className="player__artist">
                        <span className="player__artist-name" >{this.props.activeSong.name}</span>
                        <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "16px", color: "#3ae374" }}>by {artistsName}</div>
                    </div>
                </div>
                <div ref={element => { this.defaultBar = element; }} className="default-bar">
                    <div className="bar" style={{ width: this.state.width + 'px' }} ></div>
                </div>
                <div className="player">

                    <div className="player__buttons">
                        <button className="btn" onClick={this.prev}>
                            <svg className="btn-icon">
                                <use xlinkHref="/sprite.svg#icon-previous2">
                                </use>
                            </svg>
                        </button>
                        <button className="btn btn--l" onClick={this.playOrPause}>
                            <svg className="btn-icon">
                                <use xlinkHref={this.state.buttonPlay}>
                                </use>
                            </svg>
                        </button>
                        <button className="btn" onClick={this.next}>
                            <svg className="btn-icon">
                                <use xlinkHref="/sprite.svg#icon-next2">
                                </use>
                            </svg>
                        </button>

                        <button className="btn btn--s" onClick={this.muteOrUnmute}>
                            <svg style={{ fill: this.state.isClicked ? "#00a8ff" : "#fff" }} className="btn-icon">
                                <use xlinkHref={this.state.buttonMute}>
                                </use>
                            </svg>
                        </button>
                    </div>

                    <div className="player__time">
                        <span>{this.state.currentTime}</span>/
                        <span>{this.getTrackTime().minutes}:{this.getTrackTime().seconds}</span>
                    </div>
                </div>
            </nav >
        )
    }
}

export default Player;
