import React, { Component } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MovieGallery from './MovieGallery';
import TextField from '@material-ui/core/TextField';
import fire from './config.js'

function formControlStyle() {
    return {
        minWidth:" 120px",
        marginLeft: "4%",
    }
}



var selectedMovieList =  "All";
class MoviePage extends Component {
    
    constructor(){
        super();
        this.state = {
            movies: [],
            data: [],
            selectedMovieList: "All",
            movieLists: ["All"],
            change: false,
            lookForMovie: "",
            lookForMovieinfo: "",
            changeMovieGallery: false
        }
        this.changeChange = () => {
            this.setState({change: true})
        }
        this.updated = () => {
            this.setState({changeMovieGallery: false})
        }
    }


    
    componentWillMount(){
        this.state.movies = this.props.movies;
        let ref = fire.database().ref("MovieLists");
        ref.on('value', snapshot => {
          this.state.data.length = 0;
          var val = snapshot.val()
          var keys = Object.keys(val)
          for(var i = keys.length-1; i >= 0; i--) {
            this.state.movieLists.push(val[keys[i]]["List"])
          }
        })   
    }

    
    shouldComponentUpdate(){
        console.log("need to update")
        return (this.state.change || this.state.changeMovieGallery) ;
    }


    componentDidUpdate(){
        let ref = fire.database().ref(selectedMovieList);
        this.state.movies= [];
        ref.on('value', snapshot => {
            var val = snapshot.val()
            var keys = Object.keys(val)
            for(var i = keys.length-1; i >= 0; i--) {
                if(val[keys[i]]["IMDBID"] !== 0) this.state.movies.push(val[keys[i]])}
        })
        
        this.state.change = false;
    }

    render() {
        return (
            <div>
                <FormControl style={formControlStyle()}>
                    <InputLabel id="demo-simple-select-label" style={{color: "white"}} >movieLists</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMovieList}
                    onChange={(event) => {
                        selectedMovieList = event.target.value
                        this.setState({change: true})
                        let ref = fire.database().ref(selectedMovieList);
                        
                        this.state.movies= [];
                        ref.on('value', snapshot => {
                            var val = snapshot.val()
                            var keys = Object.keys(val)
                            for(var i = keys.length-1; i >= 0; i--) {
                                if(val[keys[i]]["IMDBID"] !== 0) this.state.movies.push(val[keys[i]])}
                        })
                        
                    }}>
                    {
                        this.state.movieLists.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                
                <TextField

                    id="standard-full-width standard-required"
                    label={"Movie Name"}
                    style={{ margin: 8 }}
                    placeholder="Movie List Name"
                    fullWidth
                    margin="normal"
                    color="primary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(event) => { this.state.lookForMovie = event.target.value}}/>
                <Button variant="outlined" size="large" color="primary" style={{ margin: 8}} fullWidth onClick={
                    () => {
                        let ref = fire.database().ref("All");
                        ref.on('value', snapshot => {
                            var val = snapshot.val()
                            var keys = Object.keys(val)
                            for(var i = keys.length-1; i >= 0; i--) {
                                if(val[keys[i]]["IMDBID"] !== 0) {
                                    var IMDBID = (val[keys[i]]["IMDBID"])
                                    axios.get(
                                        `https://www.omdbapi.com/?apikey=ddc02ece&i=${IMDBID}&plot=full`
                                    ).then(res => res.data)
                                    .then( async(res) => {
                                        if(res.Title === this.state.lookForMovie){
                                            const id = await res.imdbID
                                            if(id.ok){
                                                this.setState({movies: {"IMDBID": id}, changeMovieGallery: true})

                                            }
                                            
                                            
                                            return;
                                        }else{
                                            this.setState({movies: []})
                                            this.state.change = true;
                                        }
                                    })
                                }
                            }
                        })
                        }}> Search The Movie </Button>
                <MovieGallery updated={this.updated} changeMovieGallery={this.state.changeMovieGallery} changed={this.changeChange} movies={this.state.movies} movieLists={this.state.movieLists} selectedMovieList={selectedMovieList} ></MovieGallery>
                
            </div>
        );
    }
}

export default MoviePage;