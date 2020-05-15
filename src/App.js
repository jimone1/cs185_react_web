import React, { Component } from 'react';
import './App.css';
import TabList from './Components/TabList'
import Body from './Components/Body'
import {Helmet} from 'react-helmet'
import fire from './Components/config.js'

export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1,
      data: [],
      shouldUpdate: true
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
    this.changeUpdate = () => {
      this.setState({
        shouldUpdate: false
      })
    }
  }

  componentDidMount(){
      let ref = fire.database().ref('messages');
      ref.on('value', snapshot => {
          this.state.data.length = 0;
          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) this.state.data.push(val[keys[i]])
      })   
  }

  componentDidUpdate(prevProps, prevState, snapshoyt){
      //only call set state here if it is wrapped in a condition
      //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
      if(this.state.shouldUpdate !== prevState.shouldUpdate){
        let ref = fire.database().ref('messages');
        ref.on('value', snapshot => {
          this.state.data.length = 0;
          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) this.state.data.push(val[keys[i]])
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
      },{
        id: 6,
        title: "MOVIE"
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
          <Body activeTab={this.state.activeTab} data={this.state.data} changeUpdate={this.changeUpdate}/>
        </div>
      </div>
    );
  }
}

export default App;
