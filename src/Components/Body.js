import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Projects from './Projects'
import Display from './Display.js'

class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab;
        if(activeTab === 1)
            return <Home/>
        else if(activeTab === 2)
            return <Images/>
        else if(activeTab === 3) 
            return <Videos/>
        else if(activeTab === 4) 
            return <Projects/>
        else if(activeTab === 5)
            return <Display data={this.props.data} changeUpdate={this.props.changeUpdate}/>
    }
    render() {
        return (
            this.displayContent()
        );
    }
}

export default Body;