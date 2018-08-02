import React, { Component } from 'react'
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import AlbumList from './AlbumList';

class AppRoot extends Component {
    constructor() {
        super();
        this.apiUrl = "https://api.spotify.com/v1";
        this.token = "BQBJM6_3qWtA_neVx-YRNa1K0wzH2xVmfBtvC3W_pllgcvrQq7hjhu10MfJZAynxQ-uxSEgToetQsznBjt2sXDcPFl8pHu85ZoicqIFf14cPaZwtNH1SQodsH9g4Iq_FiF8LI4gcVhpsBuT5WiJ6EdBdO9bmIwCa&refresh_token=AQAu9YXAKsHQFxz3sIs8B3Vc0R_MM0gV514-Jeix-mDagd5BwJc8jDUBT9Qp5TM3Zq6MEfeGYSLqb7QNT7LVzhGbkdCEuol-dV8khGrfU2yF9XgwgODtJACTnQVtRdwJwM0";
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
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRoot;