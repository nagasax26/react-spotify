import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
    constructor() {
        super();
        this.hadnleTextChange = this.hadnleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { searchText: "" };
    }
    handleSubmit(e) {
        e.preventDefault();

        axios.get(`${this.props.apiUrl}/search?q=${this.state.searchText}&type=track`, this.props.auth)
            .then(res => {
                let tracks = res.data.tracks.items.filter(item => item.preview_url);
                this.props.setTrackList(tracks, true);
            });
        this.setState({ searchText: "" });
    }
    hadnleTextChange(e) {
        this.setState({ searchText: e.target.value });
    }
    render() {
        return (
            <div className="input-search-box">
                <form onSubmit={this.handleSubmit}>
                    <input className="input-search" placeholder="Search Track" type="text" onChange={this.hadnleTextChange} value={this.state.searchText} />
                </form>
            </div>
        )
    }
}

export default Search;
