import React, { Component } from 'react';
import Jelly from '../assets/Videos/Video1.MP4'
import Ski from '../assets/Videos/Video2.MP4'
import RobotDog from '../assets/Videos/Video3.mp4'
class Videos extends Component {
    render() {
        return (
            <div className="videos-gallery">
                <div className="video"> 
                    <video controls style={{width: "300px", height: "300px"}}> <source src={Jelly} type="video/mp4"/> </video> 
                </div>
                <div className="video"> 
                    <video controls style={{width: "300px", height: "300px"}}> <source src={Ski} type="video/mp4"/> </video> 
                </div>
                <div className="video"> 
                    <video controls style={{width: "300px", height: "300px"}}> <source src={RobotDog} type="video/mp4"/> </video> 
                </div>
            </div>
        );
    }
}

export default Videos;