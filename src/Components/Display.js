import { ListItem, List } from '@material-ui/core';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import fire from './config.js'



class Display extends Component {
    
    constructor(props){
        super(props);
        this.state = {data: []}
    }

    componentDidMount(){
        let ref = fire.database().ref('messages');
        ref.on('value', snapshot => {
            var val = snapshot.val()
            var keys = Object.keys(val)
            for(var i = keys.length-1; i >= 0; i--) this.state.data.push(val[keys[i]])
        })   
    }
    
    componentDidUpdate(prevProps, prevState, snapshoyt){
        //only call set state here if it is wrapped in a condition
        //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
        if(this.state.shouldUpdate !== prevState.shouldUpdate){
            //same code as above to retrieve the data 
        }
    }

    render() {
        
        return (
            <Paper style={{
                overflow: 'auto',
                width: 'auto',
                maxHeight: '418px',
                backgroundColor: 'rgba(194, 255, 199, 0.733)',
                display: 'block',
                flexWrap: 'wrap',}}>
                <List>
                    {
                        this.state.data.map((value, index) =>{
                            if(value.opt === "true")
                                return (
                                    <ListItem divider={true} key={index}>
                                    Date: {value.time} <br/>
                                    Name: {value.name} <br/>
                                    Message: {value.wordToMe}
                                    </ListItem>)
                        })
                        
                    }
                </List>
            </Paper>
        );
    }
}

export default Display;