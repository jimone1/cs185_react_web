import { ListItem, List } from '@material-ui/core';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AllQuestions from './AllQuestions.js'
import fire from './config.js'



class Display extends Component {

    render() {
        return (    
            <div className="HomePage">
                <AllQuestions changeUpdate={this.props.changeUpdate}/>
                <Paper style={{
                    overflow: 'auto',
                    width: 'auto',
                    maxHeight: '418px',
                    backgroundColor: 'rgba(194, 255, 199, 0.733)',
                    display: 'block',
                    flexWrap: 'wrap',}}>
                    <List>
                        {
                            this.props.data.map((value, index) =>{
                                if(value.opt === "true")
                                    return (
                                            <ListItem divider={true} key={index}>
                                            Date: {value.time} <br/>
                                            Name: {value.name} <br/>
                                            Message: {value.wordToMe}
                                            </ListItem>
                                            )
                            })
                            
                        }
                    </List>
                </Paper>
            </div>
        );
    }
}

export default Display;