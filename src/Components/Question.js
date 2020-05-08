import React, { Component } from 'react';


class Question extends Component { 
    render() {
        return (
            <div className="Question">
                <h4>{this.props.questionName}</h4> 
            </div>
        );
    }
}

export default Question;