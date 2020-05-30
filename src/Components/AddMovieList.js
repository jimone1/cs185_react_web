import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from './config.js'

function AddNewMovieStyle(){
    return {
        paddingLeft: "3%",
        height: "10vh",
        width: "30vw",
    }
}
class AddMovieList extends Component {
    constructor(){
        super();
        this.state = {
            newMovieListName: null
        };
    }

    render() {
        return (
            <div style={AddNewMovieStyle()}>
                <TextField

                    id="standard-full-width standard-required"
                    label={"Movie List"}
                    style={{ margin: 8 }}
                    placeholder="Movie List Name"
                    fullWidth
                    margin="normal"
                    color="primary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(event) => { this.setState({newMovieListName: event.target.value}) 
                    }}/>
                <Button variant="outlined" size="large" color="primary" style={{ margin: 8}} fullWidth onClick={
                    () => {
                        if(this.state.newMovieListName != null){
                            fire.database().ref("MovieLists").push({
                                "List": this.state.newMovieListName
                            });
                            fire.database().ref(this.state.newMovieListName).push({
                                IMDBID: "0"
                            })
                            this.props.changeUpdate();
                            window.alert("Message Sent!");
                        }}}> Send the Movie </Button>
            </div>
        );
    }
}

export default AddMovieList;