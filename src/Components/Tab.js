import React, { Component } from 'react';

class Tab extends Component {
    addStyling=()=>{
        if(this.props.tab.id=== this.props.activeTab){
            return{backgroundColor: "gray"}
        }
        else{
            return{backgroundColor: "rgba(255, 255, 255, 0)"}
        }
    }
    render() {
        return (
            <div className="tabs"
                style={this.addStyling()}
                onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h2>{this.props.tab.title}</h2>
            </div>
        );
    }
}

export default Tab;