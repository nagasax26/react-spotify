import React, { Component } from 'react';
import TrackItem from './TrackItem';

class TrackList extends Component {
    constructor() {
        super();
        this.renderTracks = this.renderTracks.bind(this);
    }
    
    renderTracks() {
        return this.props.tracks.map(item =>
            <div key={item.id} className="track-box">
                <TrackItem setActiveSong={this.props.setActiveSong} pad={this.props.pad}  {...item} />
            </div >
        )
    }
    render() {

        return (
            <div className="tracks-warp">
                {this.renderTracks()}
            </div>
        )
    }
}

export default TrackList;
