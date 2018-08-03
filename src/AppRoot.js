import React, { Component } from 'react'
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import AlbumList from './AlbumList';
import AlbumDetails from './AlbumDetails';

// this is for the spotifiy token to get from spotify back
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

class AppRoot extends Component {
    constructor() {
        let token = getHashParams().access_token;

        super();
        this.apiUrl = "https://api.spotify.com/v1";
        this.token = token;
        this.auth = { headers: { Authorization: `Bearer ${this.token}` } };

        this.setPreviousTrack = this.setPreviousTrack.bind(this);
        this.setNextTrack = this.setNextTrack.bind(this);
        this.setActiveSong = this.setActiveSong.bind(this);

        this.setTrackList = this.setTrackList.bind(this);

        this.state = { tracks: [], autoPlay: false, activeSong: {}, showPlayer: false };

    }
    setTrackList(tracks, changeActive) {
        if (changeActive)
            this.setState({ tracks: tracks, activeSong: tracks[0], showPlayer: true });
        else
            this.setState({ tracks: tracks, showPlayer: true });
    }
    setPreviousTrack() {
        let getTrackIndex = this.state.tracks.findIndex(track => track.id === this.state.activeSong.id);
        let prevIndex = getTrackIndex === 0 ? this.state.tracks.length - 1 : getTrackIndex - 1;
        this.setState({ autoPlay: true, activeSong: this.state.tracks[prevIndex] });
    }
    setNextTrack() {
        let getTrackIndex = this.state.tracks.findIndex(track => track.id === this.state.activeSong.id);
        if (getTrackIndex === this.state.tracks.length - 1) {
            this.setState({ autoPlay: false, activeSong: this.state.tracks[0] });
        }
        else {
            let nextIndex = (getTrackIndex + 1) % this.state.tracks.length;
            this.setState({ autoPlay: true, activeSong: this.state.tracks[nextIndex] });
        }
    }
    setActiveSong(trackId) {
        let getTrackIndex = this.state.tracks.findIndex(track => track.id === trackId);
        this.setState({ showPlayer: true, autoPlay: true, activeSong: this.state.tracks[getTrackIndex] })
    }
    pad(number) {
        return number < 10 ? '0' + number : number;
    }
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Header showPlayer={this.state.showPlayer} activeSong={this.state.activeSong} setPreviousTrack={this.setPreviousTrack} setNextTrack={this.setNextTrack} autoPlay={this.state.autoPlay} pad={this.pad} setTrackList={this.setTrackList} apiUrl={this.apiUrl} token={this.token} auth={this.auth} />
                    <Route exact path="/" render={() => <App setActiveSong={this.setActiveSong} pad={this.pad} tracks={this.state.tracks} setTrackList={this.setTrackList} apiUrl={this.apiUrl} token={this.token} auth={this.auth} />} />
                    <Route exact path="/albums" render={() => <AlbumList apiUrl={this.apiUrl} token={this.token} auth={this.auth} />} />
                    <Route path='/albums/:id/tracks' render={(props) => <AlbumDetails pad={this.pad} {...props} />} />

                </div>

            </BrowserRouter>
        )
    }
}

export default AppRoot;