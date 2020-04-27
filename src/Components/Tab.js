import React, { Component } from 'react';

class Tab extends Component {
    render() {
        return (
            <div className="tabs"
                onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h2>{this.props.tab.title}</h2>
            </div>
        );
    }
}

export default Tab;