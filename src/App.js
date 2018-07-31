import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search';
import TrackList from './TrackList';
import Player from './Player';

class App extends Component {
  constructor() {
    super();
    this.apiUrl = "https://api.spotify.com/v1";
    this.token = "BQBx4uh79CjI4m4B81bHA0VaqHQ7pJzkOrRJTu5hC1n6PuukB6uQC75p8yuIYLVH_tW6J_ENcEzCzthvVqE150NOIX868cacS37kZwPhDjhHXk_K52iC2hJvOWTGx3kbwsHkyaNP4CWiy6POGsLDCYrnGCGf1JJc&";
    this.auth = { headers: { Authorization: `Bearer ${this.token}` } };

    this.setTrackList = this.setTrackList.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategoriesPlaylist = this.getCategoriesPlaylist.bind(this);
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.setPreviousTrack = this.setPreviousTrack.bind(this);
    this.setNextTrack = this.setNextTrack.bind(this);
    this.setActiveSong = this.setActiveSong.bind(this);

    this.state = { autoPlay: false, activeSong: {}, showPlayer: false, tracks: [] };
  }

  setTrackList(tracks) {
    this.setState({ tracks: tracks });
  }
  getCategories() {
    axios.get(`${this.apiUrl}/browse/categories`, this.auth)
      .then(res => {
        let categoryId = res.data.categories.items[0].id;
        this.getCategoriesPlaylist(categoryId);
      });
  }
  getCategoriesPlaylist(categoryId) {
    axios.get(`${this.apiUrl}/browse/categories/${categoryId}/playlists`, this.auth)
      .then(res => this.getPlaylistTracks(res.data.playlists.items[0].id));
  }
  getPlaylistTracks(playlistId) {
    axios.get(`${this.apiUrl}/users/smarts003/playlists/${playlistId}/tracks`, this.auth)
      .then(res => {
        let tracks =
          res.data.items.filter(item => item.track.preview_url)
            .map(item => item.track);
        this.setState({ tracks: tracks, activeSong: tracks[0] });
      });
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
  componentDidMount() {
    this.getCategories();
  }
  pad(number) {
    return number < 10 ? '0' + number : number;
  }
  render() {
    return (
      <div className="App">
        <Search
          apiUrl={this.apiUrl}
          token={this.token}
          auth={this.auth}
          setTrackList={this.setTrackList} />

        <TrackList setActiveSong={this.setActiveSong} pad={this.pad} tracks={this.state.tracks} />
        {this.state.showPlayer &&
          <Player pad={this.pad} autoPlay={this.state.autoPlay}
            setNextTrack={this.setNextTrack}
            setPreviousTrack={this.setPreviousTrack}
            activeSong={this.state.activeSong} />
        }
      </div>

    );
  }
}

export default App;
