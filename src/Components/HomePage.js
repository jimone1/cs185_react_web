import React, { Component } from 'react';
import AllQuestions from './AllQuestions.js'
import Display from './Display.js'

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <AllQuestions/>
                <Display/>
            </div>
        );
    }
}

export default HomePage;