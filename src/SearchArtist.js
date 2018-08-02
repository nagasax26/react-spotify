import React, { Component } from 'react'
import axios from 'axios';

class SearchArtist extends Component {
    constructor() {
        super();
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.getArtist = this.getArtist.bind(this);
        this.getArtistAlbums = this.getArtistAlbums.bind(this);

        this.state = { textSearch: "" };
    }
    handleChangeText(e) {
        this.setState({ textSearch: e.target.value });
    }
    componentDidMount() {
    }
    handleSearchClick() {
        this.getArtist();
    }
    getArtist() {
        axios.get(`${this.props.apiUrl}/search?q=${this.state.textSearch}&type=artist`, this.props.auth)
            .then(res => {

                this.getArtistAlbums(res.data.artists.items[0].id);
            });
    }
    getArtistAlbums(artistId) {
        axios.get(`${this.props.apiUrl}/artists/${artistId}/albums`, this.props.auth)
            .then(res => {
                this.props.setAlbumList(res.data.items);
            });
    }
    render() {
        return (
            <div className="input-search-box" style={{ marginTop: "16px" }}>
                <input placeholder="Search Album" className="input-search" type="text" onChange={this.handleChangeText} value={this.state.textSearch} />
                <button className="btn btn--active" onClick={this.handleSearchClick}>search</button>
            </div>
        )
    }
}

export default SearchArtist;