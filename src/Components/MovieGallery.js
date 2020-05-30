import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import OneMovie from './OneMovie.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import fire from './config.js'
import { faWindows } from '@fortawesome/free-brands-svg-icons';

function formControlStyle() {
    return {
        minWidth:" 120px",
        marginLeft: "4%",
    }
}

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

var selectedMovieList;
var change = false;
var modalChange = false;
function changeChange(boo){
    modalChange = boo;
}

class MovieGallery extends Component {
    constructor(){
        super();
        this.state = {
            moviePoster: "",
            open: false,
            key: 1,
            visibleItems: 8,
            visibility: "visible",
            movieLists: []
        };
        let ref = fire.database().ref("MovieLists");
        ref.on('value', snapshot => {
          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) {
            this.state.movieLists.push(val[keys[i]]["List"])
          }
        })   
        this.changeMoviePoster = (data) => {this.setState({moviePoster: data})};
        this.changeKey = (k) => {this.setState({key: k})};
        this.changeOpen = (boo) => {this.setState({open: boo})};}


    shouldComponentUpdate(nextProps){
        const movieListChanged = (this.props.selectedMovieList !== nextProps.selectedMovieList);
        return (movieListChanged || change || modalChange || this.props.changeMovieGallery);
    }
    
    componentDidUpdate(){
        if(change){
            if(this.props.movies.length > this.state.visibleItems) this.setState({visibility: "hidden"})
            else this.setState({visibility: "visible"})
            this.setState({visibleItems: 8})
            change = false;
        }
        modalChange = false;
        this.props.updated();
    }

    render() {
        
        
        selectedMovieList = this.props.selectedMovieList;

        
        console.log("here: ", this.props.movies)

        return (
            <div style={rootStyle()}>
                <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
                    {Object.values(this.props.movies).slice(0, this.state.visibleItems).map((movie, key) => (
                        <OneMovie movieid={movie.IMDBID} 
                                    indexKey={key} 
                                    changeIndexKey={this.changeKey} 
                                    changeOpen={this.changeOpen}
                                    changeMoviePoster={this.changeMoviePoster} 
                                    changeChange={changeChange} />)
                                    )
                    }
                    <Button style={buttonStyle(), {visibility: this.state.visibility} }  color="primary" onClick={
                        () => {
                            if(this.props.movies.length > this.state.visibleItems){
                                
                                this.setState({visibleItems: this.state.visibleItems+8,
                                                visibility: "hidden"});
                                change = true;
                            }
                        }
                    }><h2>Load More</h2></Button>
                    
                </GridList>
                
                <Modal
                    open={this.state.open}
                    onClose={() => {changeChange(true); this.changeOpen(false)}}
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
                                <FormControl style={formControlStyle()}>
                                    <InputLabel id="demo-simple-select-label" style={{color: "white"}} >movieLists</InputLabel>
                                    <Select 
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedMovieList}
                                    onChange={(event) => {
                                        selectedMovieList = event.target.value;
                                        fire.database().ref(selectedMovieList).push({
                                            IMDBID: this.state.moviePoster.imdbID 
                                        });


                                        window.alert("succesfully added to "+ selectedMovieList)
                                        
                                    }}>
                                        <MenuItem value="Add To List" disabled>
                                            Add To List
                                        </MenuItem>
                                    {
                                        this.state.movieLists.map((value) => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                                <Button style={buttonStyle()} color="primary" onClick={
                                    () => {
                                        try {
                                            this.props.movieLists.map((movielist) => {
                                                let ref = fire.database().ref(movielist);
                                                ref.on('value', snapshot => {
                                                    var val = snapshot.val()
                                                    var keys = Object.keys(val)
                                                    for(var i = keys.length-1; i >= 0; i--){
                                                        if(val[keys[i]]["IMDBID"] === -1 || val[keys[i]]["IMDBID"] === this.state.moviePoster.imdbID ){
                                                            console.log(keys[i])
                                                            fire.database().ref(movielist).child(keys[i]).remove();
                                                        }
                                                    }
                                                })   
                                            })
                                            this.props.changed();
                                            
                                            window.alert("successfully deleted " + this.state.moviePoster.Title)
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