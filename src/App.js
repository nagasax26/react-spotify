import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search';
import TrackList from './TrackList';
import Player from './Player';
import InfiniteScroll from 'react-infinite-scroller';


class App extends Component {
  constructor() {
    super();
    this.apiUrl = "https://api.spotify.com/v1";
    this.token = "BQAtsFmK05mtFeuF1JxaGaTxVND3WQlfOIsRA6lxsCThO5tdcur_8QORT4RTjeiKy-FcE7NOvWKZV1tegR03Mw49x4wZhkW6KmlXm0oWPT58LMD_54nc-yeT2IjiOIII2VW8J8COPYzNxBMRnh3DKCiqJIDZ0CHI&refresh_token=AQD758cXFMnm3BdHeMx0Hcpnoc4ZpdORbrmlpi6jIi7PsjgmhWxnrz6foYdK6twmu_U33SQEqpV7Ky2s5WL8rVztcqH8hPjG7yBoekt_afd42Lip6LBZF4pZTzJeMQ5y4Cw";
    this.auth = { headers: { Authorization: `Bearer ${this.token}` } };
    this.categoryNumber = 0;
    this.playlistNumber = 0;
    this.changeCategory = false;

    this.setTrackList = this.setTrackList.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategoriesPlaylist = this.getCategoriesPlaylist.bind(this);
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.setPreviousTrack = this.setPreviousTrack.bind(this);
    this.setNextTrack = this.setNextTrack.bind(this);
    this.setActiveSong = this.setActiveSong.bind(this);
    this.removeDuplicate = this.removeDuplicate.bind(this);
    this.loadFunc = this.loadFunc.bind(this);

    this.state = { autoPlay: false, activeSong: {}, showPlayer: false, tracks: [] };
  }

  setTrackList(tracks) {
    this.setState({ tracks: tracks });
  }
  getCategories() {
    axios.get(`${this.apiUrl}/browse/categories`, this.auth)
      .then(res => {
        // this need to be flatten 
        // need * to get all ids from all the category..
        if (this.categoryNumber === res.data.categories.items.length)
          return;
        let categoryId;
        if (this.changeCategory)
          categoryId = res.data.categories.items[this.categoryNumber++].id;
        else
          categoryId = res.data.categories.items[this.categoryNumber].id;
        this.getCategoriesPlaylist(categoryId);
      });
  }
  getCategoriesPlaylist(categoryId) {
    axios.get(`${this.apiUrl}/browse/categories/${categoryId}/playlists`, this.auth)
      .then(res => {
        // the res need to be flatten to display single array
        // need to be mapped to single ids
        if (this.playlistNumber === res.data.playlists.items.length) {
          this.playlistNumber = 0;
          this.changeCategory = true;
          return;
        }
        this.getPlaylistTracks(res.data.playlists.items[this.playlistNumber++].id);
      });
  }
  getPlaylistTracks(playlistId) {
    axios.get(`${this.apiUrl}/users/smarts003/playlists/${playlistId}/tracks`, this.auth)
      .then(res => {
        let tracksFromState = this.state.tracks.concat();
        let tracks =
          res.data.items.filter(item => item.track.preview_url)
            .map(item => item.track);
        let combined = this.removeDuplicate([...tracksFromState, ...tracks]);
        // this.setState({ tracks: combined, activeSong: combined[0] });
        this.setState({ tracks: combined });
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
  loadFunc() {
    this.getCategories(1);
  }
  removeDuplicate(arr) {
    let obj = {};
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i].id]) {
        arr2.push(arr[i]);
        obj[arr[i].id] = true;
      }
    }
    return arr2;
  }
  render() {
    return (
      <div className="App">
        <Search
          apiUrl={this.apiUrl}
          token={this.token}
          auth={this.auth}
          setTrackList={this.setTrackList} />

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}>
          <TrackList setActiveSong={this.setActiveSong} pad={this.pad} tracks={this.state.tracks} />
        </InfiniteScroll>

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
