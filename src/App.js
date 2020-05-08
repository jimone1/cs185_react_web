import React, { Component } from 'react';
import './App.css';
import TabList from './Components/TabList'
import Body from './Components/Body'
import {Helmet} from 'react-helmet'
export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render(){
    const tabs = [
      {
        id: 1,
        title: 'HOME'
      },{
        id: 2,
        title: 'IMAGES'
      },{
        id: 3,
        title: 'VIDEOS'
      },{
        id: 4,
        title: 'PROJECTS'
      },{
        id: 5,
        title: 'CONTACT'
      }
    ]
    return (
      <div className="Body">
        <div className="main-body">
          <Helmet>
            <title>Jim's Webpage</title>
          </Helmet>
          <div className="nav-bar">
            <TabList tabs={tabs} 
                    changeTab={this.changeTab} 
                    activeTab={this.state.activeTab}/>
          </div>
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}

export default App;
