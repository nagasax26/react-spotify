import React, { Component } from 'react'

export default class TrackDetail extends Component {
    getTrackTime() {
        let minutes = this.props.pad(Math.floor(this.props.duration_ms / (1000 * 60)));
        let seconds = this.props.pad(Math.floor((this.props.duration_ms % (1000 * 60)) / 100 / 10));
        return { minutes: minutes, seconds: seconds }
    }
    render() {
        return (
            <div className="track-detail">
                <div>{this.props.track_number}</div>
                <div style={{ marginRight: "auto", marginLeft: "30px" }}>{this.props.name}</div>
                <div>{this.getTrackTime().minutes}:{this.getTrackTime().seconds}</div>
            </div>
        )
    }
}
