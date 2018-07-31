import React, { Component } from 'react'
class TrackItem extends Component {
    constructor() {
        super();
        this.getTrackTime = this.getTrackTime.bind(this);
        this.handleClickPlay = this.handleClickPlay.bind(this);
    }
    getTrackTime() {
        let minutes = this.props.pad(Math.floor(this.props.duration_ms / (1000 * 60)));
        let seconds = this.props.pad(Math.floor((this.props.duration_ms % (1000 * 60)) / 100 / 10));
        return { minutes: minutes, seconds: seconds }
    }
    handleClickPlay() {
        this.props.setActiveSong(this.props.id);
    }

    render() {
        return (
            <div className="track">
                <div className="track__img-box">
                    <img width="100%" src={this.props.album.images[0].url} alt="" />
                </div>
                <div className="track__artist">{this.props.artists[0].name}</div>
                <div className="track__name">{this.props.name}</div>
                <div>{this.getTrackTime().minutes}:{this.getTrackTime().seconds}</div>
                <button className="btn" onClick={this.handleClickPlay}>
                    <svg className="btn-icon">
                        <use xlinkHref="/sprite.svg#icon-play3">
                        </use>
                    </svg>
                </button>
            </div>
        )
    }
}

export default TrackItem;
