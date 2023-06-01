import React, {Component, useEffect, useState} from 'react';
import { Navigate} from 'react-router-dom';

class PrivateRoute extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin : true //SHOULD BE FALSE (NOT WORKING CURRENTLY THEREFORE ITS TRUE)
        }
    }
     
    componentWillMount() {
        fetch(`${process.env.REACT_APP_API_URL}/checkUserStatus`).then(response => 
            response.json().then(data => {
                this.setState = {
                    loggedin : data['userLogged']
                }
            }))
    }
     
    render() {
        return (
            this.state.loggedin ? this.props.children : <Navigate to="/" />
        );
    }
};
     
export default PrivateRoute;