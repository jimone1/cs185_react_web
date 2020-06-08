import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Projects from './Projects'
import Display from './Display.js'
import MoviePage from './MoviePage';
import AddNewMovie from './AddNewMovie'
import AddMovieList from './AddMovieList';
import MovieGraph from './MovieGraph';

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
            return <Display data={this.props.data} 
                            changeUpdate={this.props.changeUpdate}/>
        else if(activeTab === 6)
            return <MoviePage movies={this.props.movies} 
                                selectedMovieList={this.props.selectedMovieList}
                                movieLists={this.props.movieLists}
                                changeSelectedMovieList={this.props.changeSelectedMovieList} 
                                changeUpdate={this.props.changeUpdate}
                                clearMovies={this.props.clearMovies}
                                />
        else if(activeTab === 7)
            return <AddNewMovie movieLists={this.props.movieLists}
                    changeUpdate={this.props.changeUpdate}/>
        else if(activeTab === 8)
            return <AddMovieList changeUpdate={this.props.changeUpdate} 
                                changeMovieLists={this.props.changeMovieLists}/>
        else if (activeTab === 9) return <MovieGraph/>
    }
    render() {
        return (
            this.displayContent()
        );
    }
}

export default Body;