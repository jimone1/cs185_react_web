import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from './config.js'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
}));

const questionNames = [ 
    "What is your name?",
    "Offer a short description of yourself",
    "What have you to say?",
    "Would you like your name and message to be viewable by other guests of this site?",
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


export default function Answer() {
    const style = useStyles();    
    const [opt, setOpt] = React.useState('false');
    const [name, setName] = React.useState('defaultName');
    const [description, setDescription] = React.useState('null');
    const [wordToMe, setWordToMe] = React.useState('defaultWordToMeLongLongLong');
    const [email, setEmail] = React.useState('null');

    var time = new Date().getTime();
    var date = new Date(time).toString();


    // const [shouldRender, setShouldRender] = React.useState(true)
    // useEffect( () => {
    //     data = []
    //     let ref = fire.database().ref('messages');
    //     ref.on('value', snapshot => {
    //         var state = snapshot.val()
    //         var keys = Object.keys(state)
    //         for(var i = keys.length-1; i >= 0; i--) data.push(state[keys[i]])
    //     })   
    //     setShouldRender(false);
    // }, [shouldRender]);

    return (
        <form className={style.root} noValidate autoComplete="off">
            <TextField required
            error = {!checkName(name)}
            helperText = {nameHelpText(name)}
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
            onChange={(event) => {setName(event.target.value)}}
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
            onChange={(event) => {setDescription(event.target.value)}}
            />
            <TextField required
            error = {!checkMessage(wordToMe)}
            helperText = {messageHelpText(wordToMe)}
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
            onChange={(event) => {setWordToMe(event.target.value)}}
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
            value={opt}
            onChange={(event) => {setOpt(event.target.value)}}
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
            onChange={(event) => {setEmail(event.target.value)}}
            />
            
            
            <Button variant="outlined" size="large" color="primary" style={{ margin: 8}} fullWidth onClick={() => {
                if(checkName(name) && checkMessage(wordToMe) && name !== "defaultName" && wordToMe !== "defaultWordToMeLongLongLong"){
                    fire.database().ref('messages').push({
                    "name": name,
                    "description": description,
                    "wordToMe": wordToMe,
                    "email": email,
                    "time": date,
                    "opt": opt
                    });
                    // setShouldRender(true);
                    window.alert("Message Sent!");
                }else if (name === "defaultName" && wordToMe === "defaultWordToMeLongLongLong"){
                    setName(" ");
                    setWordToMe(" ");
                }
            }}>
                Send the message
            </Button>
        </form>
    );
}