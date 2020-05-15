import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Modal from '@material-ui/core/Modal';
import OneMovie from './OneMovie.js'

function rootStyle(){
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
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

const movies = 
    [{
        key: "0",
        id: "tt0990372"
    },{
        key: "1",
        id: "tt6751668"
    },{
        key: "2",
        id: "tt0478087"
    },{
        key: "3",
        id: "tt7016936"
    },{
        key: "4",
        id: "tt0944947"
    },{
        key: "5",
        id: "tt6966692"
    },{
        key: "6",
        id: "tt0245429"
    },{
        key: "7",
        id: "tt5311514"
}]

  
function getModalStyle() {
    return {
        position: "absolute",
        display: "flex",
        top: "23vh",
        left: "23vw",
        backgroundColor: "white"
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


class MovieGallery extends Component {
    constructor(){
        super();
        this.state = {
            moviePoster: "",
            open: false,
            key: 1
        }
        this.changeMoviePoster = (data) => {
            this.setState({
                moviePoster: data
            })
        }
        this.changeKey = (k) => {
            this.setState({
                key: k
            })
        }
        this.changeOpen = (boo) => {
            this.setState({
                open: boo    
            })
        }
    }
    
    render() {
        return (
            <div style={rootStyle()}>
                <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
                    {Object.values(movies).map((movie) => (
                        <OneMovie movieid={movie.id} 
                                    indexKey={movie.key} 
                                    changeIndexKey={this.changeKey} 
                                    changeOpen={this.changeOpen}
                                    changeMoviePoster={this.changeMoviePoster} />
                    ))}
                </GridList>
                {/* {console.log(this.state.moviePoster.Poster)} */}
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
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        );
    }
}

export default MovieGallery;