import React, { Component } from 'react'
import axios from 'axios';

export default class AlbumDetails extends Component {

    constructor(){
        super();
        this.state = {
            tracks: []
        }
    }

    componentDidMount(){
        axios.get(`${this.props.location.myData.apiUrl}/albums/${this.props.location.myData.id}/tracks`)
        .then(
            res=>this.setState({track: res.data.items})
        )
    }

    render() {
        console.log(this.props.location.myData.images[0].url)
        return (
            <div>
                <img src={this.props.location.myData.images[0].url} alt="" />
               <p>{this.props.location.myData.name}</p>
                <p>{this.props.location.myData.artists[0].name}</p>
            </div>
        )
    }
}
