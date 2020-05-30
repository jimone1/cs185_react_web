import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MovieGallery from './MovieGallery';
import fire from './config.js'

function formControlStyle() {
    return {
        minWidth:" 120px",
        marginLeft: "4%",
    }
}

var selectedMovieList =  "All"

class MoviePage extends Component {
    
    constructor(){
        super();
        this.state = {
            movies: [],
            data: [],
            selectedMovieList: "All",
            movieLists: ["All"],
            change: false
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

    // componentWillUpdate(){
        
    //     this.state.movies= [];
    //     let ref = fire.database().ref(this.state.selectedMovieList);
    //     ref.on('value', snapshot => {
    //         var val = snapshot.val()
    //         var keys = Object.keys(val)
    //         for(var i = keys.length-1; i >= 0; i--) if(val[keys[i]] != 0) this.state.movies.push(val[keys[i]])
    //     })   
    // }
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
                        // console.log("val: ", event.target.value)
                        selectedMovieList = event.target.value
                        this.setState({
                            change: true
                        })
                        // console.log("selected: ", selectedMovieList)
                        let ref = fire.database().ref(selectedMovieList);
                        
                        this.state.movies= [];
                        ref.on('value', snapshot => {
                            var val = snapshot.val()
                            var keys = Object.keys(val)
                            for(var i = keys.length-1; i >= 0; i--) {
                                if(val[keys[i]]["IMDBID"] != 0) this.state.movies.push(val[keys[i]])}
                        })
                        console.log(selectedMovieList)
                        console.log(this.state.movies)
                        
                    }}>
                    {
                        this.state.movieLists.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                
                <MovieGallery movies={this.state.movies} selectedMovieList={selectedMovieList} ></MovieGallery>
                
            </div>
        );
    }
}

export default MoviePage;