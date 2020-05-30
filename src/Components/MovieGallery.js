import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import OneMovie from './OneMovie.js';

function rootStyle(){
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: '100vw',
        height: 'auto'
    }
}

function GridListStyle(){
    return{
        position: 'absolute',
        paddingTop: '50px', 
        paddingBottom: '50px',
        backgroundColor: '#2e2e2ebd',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridGap: '1rem', 
        width: '100%'
    }
}

function getModalStyle() {
    return {
        position: "absolute",
        display: "flex",
        top: "23vh",
        left: "30%",
        minWidth: "400px",
        backgroundColor: "white"
    }
}

function buttonStyle() {
    return {
        height: 'auto',
        width: 'auto'
    }
}

function infoStyle() {
    return {
        width: "23vw",
        height: "auto",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "15%"
    }
}

var change = false;

class MovieGallery extends Component {
    constructor(){
        super();
        this.state = {
            moviePoster: "",
            open: false,
            key: 1,
            visibleItems: 9,
            visibility: "visible"
        };
        this.changeMoviePoster = (data) => {
            this.setState({
                moviePoster: data
            })
        };
        this.changeKey = (k) => {
            this.setState({
                key: k
            })
        };
        this.changeOpen = (boo) => {
            this.setState({
                open: boo    
            })
        };
    }

    

    shouldComponentUpdate(nextProps){
        const movieListChanged = (this.props.selectedMovieList !== nextProps.selectedMovieList);
        return (movieListChanged || change);
    }
    
    componentDidUpdate(){
        change = false;
        this.setState({
            visibleItems: 9,
            
        })
        if(this.props.movies.length > this.state.visibleItems)
            this.setState({visibility: "hidden"})
        else this.setState({visibility: "visible"})
    }

    render() {
        
        if(this.props.movies.length > this.state.visibleItems)
            this.setState({visibility: "hidden"})
        else this.setState({visibility: "visible"})
        return (
            <div style={rootStyle()}>
                <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
                    {Object.values(this.props.movies).slice(0, this.state.visibleItems).map((movie, key) => (
                        <OneMovie movieid={movie.IMDBID} 
                                    indexKey={key} 
                                    changeIndexKey={this.changeKey} 
                                    changeOpen={this.changeOpen}
                                    changeMoviePoster={this.changeMoviePoster} />)
                                    )
                    }
                    <Button style={buttonStyle(), {visibility: this.state.visibility} }  color="primary" onClick={
                        () => {
                            if(this.props.movies.length > this.state.visibleItems){
                                
                                this.setState({visibleItems: this.state.visibleItems+8,
                                                visibility: "hidden"});
                                change= true;
                            }
                        }
                    }><h2>Load More</h2></Button>
                    
                </GridList>
                
                <Modal
                    open={this.state.open}
                    onClose={() => {this.changeOpen(false)}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {
                        <div style={getModalStyle()} >
                            <img src={this.state.moviePoster.Poster} alt={"poster"}/>
                            <div style={infoStyle()}>
                                <p>
                                    Title: {this.state.moviePoster.Title} <br/>
                                    Director: {this.state.moviePoster.Direcotr} <br/>
                                    Genre: {this.state.moviePoster.Genre}<br/>
                                    imdbRating: {this.state.moviePoster.imdbRating}
                                </p>
                                <Button style={buttonStyle()} color="primary" onClick={
                                    () => {
                                        try {
                                            
                                        } catch (error) {
                                            console.error(error)
                                        }
                                    }
                                }>Delete This Movie</Button>
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        );
    }
}

export default MovieGallery;