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
      movies: [],
      shouldUpdate: true,
      selectedMovieList: "All",
      movieLists: ["All"]
    }
    this.clearMovies = () => {
      this.setState({
        movies: []
      })
    }
    this.changeMovieLists = (val) => {
      this.state.movieLists.push(val)
    }
    this.changeSelectedMovieList = (val) => {
      this.setState({
        selectedMovieList: val
      })
    } 
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
    this.changeUpdate = () => {
      this.setState({
        shouldUpdate: true
      })
    }
  }


  componentDidMount(){
      let ref = fire.database().ref('messages');
      ref.on('value', snapshot => {
          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) this.state.data.push(val[keys[i]])
      })   
      ref = fire.database().ref("MovieLists");
      ref.on('value', snapshot => {
        var val = snapshot.val()
        var keys = Object.keys(val)
        for(var i = keys.length-1; i >= 0; i--) this.state.movieLists.push(val[keys[i]])
      })   
      ref = fire.database().ref(this.state.selectedMovieList);
      ref.on('value', snapshot => {
        var val = snapshot.val()
        var keys = Object.keys(val)
        for(var i = keys.length-1; i >= 0; i--) this.state.movies.push(val[keys[i]])
      })   
  }

  componentDidUpdate(prevProps, prevState, snapshoyt){
      //only call set state here if it is wrapped in a condition
      //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
      if(this.state.shouldUpdate !== prevState.shouldUpdate){
        let ref = fire.database().ref('messages');
        ref.on('value', snapshot => {

          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) this.state.data.push(val[keys[i]])
        })
        
        ref = fire.database().ref(this.state.selectedMovieList);
        ref.on('value', snapshot => {

          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) this.state.movies.push(val[keys[i]])
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
      },{
        id: 7,
        title: "ADD MOVIE"
      },{
        id: 8,
        title: "ADD MOVIE LIST"
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
          <Body activeTab={this.state.activeTab} 
                data={this.state.data} 
                movies={this.state.movies} 
                changeUpdate={this.changeUpdate}
                selectedMovieList={this.state.selectedMovieList}
                movieLists={this.state.movieLists}
                changeSelectedMovieList={this.changeSelectedMovieList}
                changeMovieLists={this.changeMovieLists}
                clearMovies={this.clearMovies}
                updateMovies={this.updateMovies}
          />
        </div>
      </div>
    );
  }
}

export default App;
