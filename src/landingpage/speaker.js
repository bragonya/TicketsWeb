import React from "react";
import './speakers.scss';

class Speaker extends React.Component {
    
    render() {
        return (
                <div class="content content--tall ">
                <div class="speakercontainer">
                    <blockquote>
                        {this.props.description}
                        <cite>{this.props.name}  <span class="color--accent font-weight--bold space--small">//</span> {this.props.tag} </cite>
                    </blockquote>
                </div>
                <p class="space-top--large">
                    <img class="avatar space-right--medium" src={this.props.image} alt="Avatar"/>
                </p>
            </div>
        );
    }
}


export default Speaker;