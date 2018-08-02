import React, { Component } from 'react'
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import AlbumList from './AlbumList';
import AlbumDetails from './AlbumDetails';

class AppRoot extends Component {
    constructor() {
        super();
        this.apiUrl = "https://api.spotify.com/v1";
        this.token = "BQAEbC_SxyD1PAe4YDTSZLyrvZu0Bm2uNbpz-ogg1Yvb_KsmKVwju2o2fTBqjBjNMGVOPDIKiY8VCY6UY0-pvxoRWkLiu9pmli2zz1pPTZeKAN6OI32pCVQGUIcXmrYAHfyx1yHCLl99zowJVJ9xL8iQZCS0&refresh_token=AQBxNhEdWsP3WzijEp-DWzCl3I14MW58lWADuWkWO5tx8vr3AlPNXVhaHvvoHTxxZOPtSi7FD5RGzfYezDaEhLTEoo15O7ImgwqGm2TmynyJHf300KBnX0_n2E2zMg2Ww7E";
        this.auth = { headers: { Authorization: `Bearer ${this.token}` } };
        this.setTrackList = this.setTrackList.bind(this);

        this.state = { tracks: [] };

    }
    setTrackList(tracks) {
        this.setState({ tracks: tracks });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Header setTrackList={this.setTrackList} apiUrl={this.apiUrl} token={this.token} auth={this.auth} />
                    <Route exact path="/" render={() => <App tracks={this.state.tracks} setTrackList={this.setTrackList} apiUrl={this.apiUrl} token={this.token} auth={this.auth} />} />
                    <Route exact path="/albums" render={() => <AlbumList apiUrl={this.apiUrl} token={this.token} auth={this.auth} />} />
                    <Route exact path='/tracks' render={(props) => <AlbumDetails {...props} />} />
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRoot;