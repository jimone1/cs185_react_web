import React, { Component } from 'react';
import QandA from './QandA.js'

class AllQuestion extends Component {
    render() {
        return (
            <div className="AllQuestion">
                <QandA changeUpdate={this.props.changeUpdate}/>
            </div>
        );
    }
}

export default AllQuestion;