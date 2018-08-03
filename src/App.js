import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TrackList from './TrackList';
import InfiniteScroll from 'react-infinite-scroller';


class App extends Component {
  constructor() {
    super();
    // this.props.apiUrl = "https://api.spotify.com/v1";
    // this.props.token = "BQAD5q40Yejz-nxLQY_Mh64ws6z4XtjiqjKrIV4fUvv773HgmAlJ12YH-bZ4bM5ggrMlG1m589GEkoUvF8oh_yYu05ZP9giiG43kixUSjU3U0DFmXmZ_w3pNxixH5oQUjF6mEaP2oLcmQw8P22sTfmHiDRvYB2qY&refresh_token=AQBXBfEAfUfy9EBLAbTlIUFeBITSQCun_uMXc62PMrDxoj0wtC0FUGXkmMpTz0a95FkpnIiyUKmMyt4Omf-to8tw4fdqLYQZyUN4bnZ21IW56CeR7o9S5syAu_KCbqfybzM";
    // this.props.auth = { headers: { Authorization: `Bearer ${this.props.token}` } };

    this.categoryNumber = 0;
    this.playlistNumber = 0;
    this.changeCategory = false;

    // this.setTrackList = this.setTrackList.bind(this);

    this.getCategories = this.getCategories.bind(this);
    this.getCategoriesPlaylist = this.getCategoriesPlaylist.bind(this);
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);



    this.removeDuplicate = this.removeDuplicate.bind(this);

    this.loadFunc = this.loadFunc.bind(this);
    this.changeActive = true;
    this.isCalledFirstTime = true;
    // this.state = { autoPlay: false, activeSong: {}, showPlayer: false };
  }

  // setTrackList(tracks) {
  //   this.setState({ tracks: tracks });
  // }
  getCategories() {
    axios.get(`${this.props.apiUrl}/browse/categories`, this.props.auth)
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
    axios.get(`${this.props.apiUrl}/browse/categories/${categoryId}/playlists`, this.props.auth)
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
    axios.get(`${this.props.apiUrl}/users/smarts003/playlists/${playlistId}/tracks`, this.props.auth)
      .then(res => {
        let tracksFromProps = this.props.tracks.concat();
        let tracks =
          res.data.items.filter(item => item.track.preview_url)
            .map(item => item.track);
        let combined = this.removeDuplicate([...tracksFromProps, ...tracks]);
        // this.setState({ tracks: combined });

        this.props.setTrackList(combined, this.changeActive);
      });
  }

  componentDidMount() {
    this.getCategories();
  }

  loadFunc() {
    if (this.isCalledFirstTime) {
      this.isCalledFirstTime = false;
      return;
    }
    this.changeActive = false;
    this.getCategories();
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


        <InfiniteScroll
          useWindow={false}
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}>
          <TrackList setActiveSong={this.props.setActiveSong} pad={this.props.pad} tracks={this.props.tracks} />
        </InfiniteScroll>


      </div>

    );
  }
}

export default App;
