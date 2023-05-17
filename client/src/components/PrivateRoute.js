import React, {Component, useEffect, useState} from 'react';
import { Navigate} from 'react-router-dom';

class PrivateRoute extends Component{
    constructor(props) {
        super(props);
        const loggedin = false
    }
     
    componentWillMount() {
        fetch('/checkUserStatus').then(response => 
            response.json().then(data => {
                this.loggedin = data['userLogged']
                console.log(this.logginin)
            }))
    }
     
    render() {
        return (
            test() ? this.props.children : <Navigate to="/" />
        );
    }
};
     
export default PrivateRoute;