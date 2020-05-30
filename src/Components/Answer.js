
import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from './config.js'


const questionNames = [ 
    "What is your name?",
    "Offer a short description of yourself",
    "What have you to say?",
    "Would you like your name and message to be viewable by other guests of this.state site?",
    "If you would like me to able to contact you, what is your email? (email won't be posted)"
];
const options = [
    {
      value: 'true',
      label: 'Yes',
    },
    {
      value: 'false',
      label: 'No',
    }
];

function checkName(name){
    return (name.length > 4 && name.length < 21);
}

function nameHelpText(name){
    if(name.length <= 4)  return "Name should be longer than 4 characters";
    else if(name.length >= 21) return "Name should be less than 21 characters";
}

function checkMessage(messageToMe){
    return (messageToMe.length > 15 && messageToMe.length < 500);
}

function messageHelpText(messageToMe){
    if(messageToMe.length <= 15) return "There should be more than 15 characters";
    else if(messageToMe.length >= 500) return "There should be less than 500 characters";
}


class Answer extends Component {

    constructor(){
        super();
        var time = new Date().getTime();
        this.state = {
            opt: 'false',
            name: 'defaultName',
            description: 'null',
            wordToMe: 'defaultWordToMeLongLongLong',
            email: 'null',
            date: new Date(time).toString()
        }
    }

    render() {
        return (
        <form noValidate autoComplete="off" 
            style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
            <TextField required
            error = {!checkName(this.state.name)}
            helperText = {nameHelpText(this.state.name)}
            id="standard-full-width standard-required"
            label={questionNames[0]}
            style={{ margin: 8 }}
            placeholder="Jim"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            onChange={(event) => { this.setState({name: event.target.value})}}
            />
            <TextField 
            id="standard-full-width standard-required"
            label={questionNames[1]}
            style={{ margin: 8}}
            placeholder="I am awesome"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            onChange={(event) => {this.setState({description: event.target.value})}}
            />
            <TextField required
            error = {!checkMessage(this.state.wordToMe)}
            helperText = {messageHelpText(this.state.wordToMe)}
            id="standard-full-width standard-required"
            label={questionNames[2]}
            style={{ margin: 8}}
            placeholder="Jim is very cool!"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            onChange={(event) => {this.setState({wordToMe: event.target.value})}}
            />
            <TextField required select
            id="standard-full-width standard-required"
            label={questionNames[3]}
            style={{ margin: 8}}
            placeholder="No"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={this.state.opt}
            onChange={(event) => {this.setState({opt: event.target.value})}}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TextField>
            <TextField 
            id="standard-full-width standard-required"
            label={questionNames[4]}
            style={{ margin: 8}}
            placeholder="myemail@domain.com"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            onChange={(event) => {this.setState({email: event.target.value})}}
            />
            
            
            <Button variant="outlined" size="large" color="primary" style={{ margin: 8}} fullWidth onClick={() => {
                if(checkName(this.state.name) && checkMessage(this.state.wordToMe) && this.state.name !== "defaultName" && this.state.wordToMe !== "defaultWordToMeLongLongLong"){
                    fire.database().ref('messages').push({
                    "name": this.state.name,
                    "description": this.state.description,
                    "wordToMe": this.state.wordToMe,
                    "email": this.state.email,
                    "time": this.state.date,
                    "opt": this.state.opt
                    });
                    this.props.changeUpdate();
                    window.alert("Message Sent!");
                }else if (this.state.name === "defaultName" && this.state.wordToMe === "defaultWordToMeLongLongLong"){
                    this.setState({
                        'name': " ",
                        'wordToMe': " "
                    })
                }
            }}>
                Send the message
            </Button>
        </form>
        );
    }
}

export default Answer;