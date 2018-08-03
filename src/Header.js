import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Player from './Player';

export default class Header extends Component {
    render() {
        return (
            <header className="nav-bar">
                <div className="icon-logo-box">
                    <div className="logo-box">
                        <svg className="logo">
                            <use xlinkHref="/sp-spotify.svg#icon-spotify"></use>
                        </svg>
                    </div>
                    <span className="icon-logo-name">Spotify</span>
                </div>
                <Search
                    apiUrl={this.props.apiUrl}
                    token={this.props.token}
                    auth={this.props.auth}
                    setTrackList={this.props.setTrackList} />
                <ul className="nav-bar__nav" >
                    <li className="nav-bar__item nav-bar__item--active"><Link className="nav-bar__link" to="/">Home</Link></li>
                    <li className="nav-bar__item"><Link className="nav-bar__link" to="/albums">Albums</Link></li>
                </ul>
                <div className="nav-bar__divider"></div>
                {this.props.showPlayer &&
                    <Player pad={this.props.pad} autoPlay={this.props.autoPlay}
                        setNextTrack={this.props.setNextTrack}
                        setPreviousTrack={this.props.setPreviousTrack}
                        activeSong={this.props.activeSong} />
                }
            </header>

        )
    }
}
