import React, { Component } from 'react'
import axios from 'axios';

class Album extends Component {
    constructor(props) {
        super();
        // console.log(props);
        this.state = { tracks: [] }
    }
    componentDidMount() {
        axios.get(`${this.props.apiUrl}/albums/${this.props.id}/tracks`, this.props.auth)
            .then(res => {
                this.setState({ tracks: res.data.items });
            });
    }
    render() {
        return (
            <div className="album-box">
                <div className="album">
                    <div className="album__details">
                        <img className="album__image" src={this.props.images[0].url} alt="" />
                    </div>
                    <div>
                        <p className="album__detail-name">{this.props.name}</p>
                    </div>
                    <div>
                        <p className="album__detail-auther">by {this.props.artists[0].name}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Album;