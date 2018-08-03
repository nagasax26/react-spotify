import React, { Component } from 'react'
import TrackDetail from './TrackDetail';

export default class AlbumDetails extends Component {
    render() {
        return (
            <div className="album-detail-box">
                <div className="album-detail">
                    <div style={{ width: "300px" }}>
                        <img style={{ width: "100%", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,.6)" }} src={this.props.location.myData.images[0].url} alt="" />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <p>{this.props.location.myData.name}</p>
                        <p>{this.props.location.myData.artists[0].name}</p>
                    </div>
                </div>
                <div className="tracklist">
                    <div style={{ color: "#92929d", padding: "10px 0", borderTop: "1px solid rgba(0,0,0,.2)", margin: "10px 30px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginLeft: "10px" }}>#</div>
                        <div style={{ marginRight: "auto", marginLeft: "30px" }}>Track</div>
                        <div style={{ marginRight: "10px" }}>Time</div>
                    </div>
                    {this.props.location.myData.tracks.map(track => <TrackDetail pad={this.props.pad} key={track.id} {...track} />)}
                </div>
            </div>
        )
    }
}
