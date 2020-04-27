import React, { Component } from 'react';
import Project1 from '../assets/Projects/Social Network.PNG';
class Projects extends Component {
    render() {
        return (
            <div className="project-gallery">
                
                <a href="https://sims-csep.cnsi.ucsb.edu/projects/mathematical-modeling-social-phenomena">
                    <div className="project project1">
                        <div className="project-image" style={{maxWidth: "550px", height: "auto"}}>
                            <img src={Project1} style={{width: "100%", height: "auto"}} alt="Social"/>
                        </div>
                        <div className="project-context">
                            <h1 >Mathematical Modeling of Social Phenomena</h1>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default Projects;