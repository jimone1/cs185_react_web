import React, { Component } from 'react';
import avatar from '../assets/Images/Avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
class Home extends Component {
    nameStyle = () => {
        return{
            fontSize: "40px"
        }
    }
    titleStyle = () => {
        return{
            color: "aliceblue",
            fontSize: "40px"
        }
    }
    render() {
        return (
            <div className="home">
                <div className="intro">
                    <div className="intro-name">
                        <h2 style={this.nameStyle()}>Yiyao (Jim) Wan</h2>
                        <h3>Computing</h3>
                        <h3>University of California, Santa Barbara</h3>
                    </div>
                </div>
                <div className="description">
                    <div className="personal">
                        <div className="avatar">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <div className="greetings">
                            <h2 style={this.titleStyle()}>Coder</h2>
                            <h3> 
                                I am currently pursuing Bachelor's degree at the University of California, 
                                Santa Barabara. I love doing web development, mobile app development, and 
                                computer architecture.
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{backgroundColor: "black"}}>
                    <div className="context">
                        <div>
                            <h1 style={{color: "azure", fontSize: "50px", margin:"auto"}}> Contact </h1>
                        </div>
                        
                        <div style={{display: "inline-flex"}}>
                            <a href="mailto:yiyaowan@ucsb.edu">
                                <FontAwesomeIcon icon={faEnvelope} style={{fontSize: "40px", textDecoration: "none"}}/>
                            </a>
                            <a href="https://github.com/jimone1">
                                <FontAwesomeIcon icon={faGithubAlt} style={{fontSize: "40px", textDecoration: "none"}} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;