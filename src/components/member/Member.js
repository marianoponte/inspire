import React, { Component } from 'react';

class Member extends Component {

    render() {
        return (
            <React.fragment>
            <td>{this.props.id}</td>
            <td>{this.props.name}</td>
            <td>{this.props.lastname}</td>
            <td>{this.props.points}</td>
            <td>{this.props.registrationDate}</td>
            </React.fragment>
        );
    }
}

export default Member;