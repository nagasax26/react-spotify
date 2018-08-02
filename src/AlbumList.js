import React, { Component } from 'react';
import SearchArtist from './SearchArtist';
import Album from './Album';


class AlbumList extends Component {
    constructor() {
        super();
        this.setAlbumList = this.setAlbumList.bind(this);
        this.state = { albums: [] }
    }
    setAlbumList(albums) {
        this.setState({ albums: albums });
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="second-main">
                <SearchArtist setAlbumList={this.setAlbumList}
                    apiUrl={this.props.apiUrl} token={this.props.token} auth={this.props.auth}
                />
                <div className="albums-warp">
                    {this.state.albums.map(album => <Album key={album.id} apiUrl={this.props.apiUrl} token={this.props.token} auth={this.props.auth}  {...album} />)}
                </div>
            </div>
        )
    }
}

export default AlbumList;
