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

class AddNewMovie extends Component {

    constructor(){
        super();
        this.state = {
            IMDBID: -1
        };
    }

    render() {
        return (
            <div style={AddNewMovieStyle()}>
                <TextField
                    id="standard-full-width standard-required"
                    label={"New Movie"}
                    style={{ margin: 8 }}
                    placeholder="IMDB ID"
                    fullWidth
                    margin="normal"
                    color="primary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(event) => { this.setState({IMDBID: event.target.value}) 
                    }}/>
                <Button variant="outlined" size="large" color="primary" style={{ margin: 8}} fullWidth onClick={
                    () => {
                        fire.database().ref('All').push({
                            "IMDBID": this.state.IMDBID 
                        });
                        this.props.changeUpdate();
                        window.alert("Message Sent!");}}> Send the Movie </Button>
            </div>
        );
    }
}

export default AddNewMovie;