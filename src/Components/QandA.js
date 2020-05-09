import React, { Component } from 'react';
import Answer from "./Answer.js";

class QandA extends Component {
    render() {
        return (
            <div className="QandA">
                <Answer changeUpdate={this.props.changeUpdate}/>
            </div>
        );
    }
}

export default QandA;